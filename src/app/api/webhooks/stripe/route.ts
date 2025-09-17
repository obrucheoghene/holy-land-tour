import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { registrations, emailLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendConfirmationEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: "2024-06-20",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(
          event.data.object as Stripe.PaymentIntent
        );
        break;

      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(
          event.data.object as Stripe.PaymentIntent
        );
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const registrationId = session.metadata?.registrationId;
  const customerEmail = session.customer_email;

  if (!registrationId) {
    console.error("No registration ID in session metadata");
    return;
  }

  try {
    // Update registration status to paid
    const [updatedRegistration] = await db
      .update(registrations)
      .set({
        paymentStatus: "paid",
        stripePaymentId: session.payment_intent as string,
        updatedAt: new Date(),
      })
      .where(eq(registrations.id, registrationId))
      .returning();

    if (!updatedRegistration) {
      console.error("Registration not found:", registrationId);
      return;
    }

    // Send confirmation email
    if (customerEmail) {
      try {
        await sendConfirmationEmail({
          to: customerEmail,
          registration: updatedRegistration,
          paymentAmount: session.amount_total! / 100, // Convert from cents
        });

        // Log successful email
        await db.insert(emailLogs).values({
          recipient: customerEmail,
          subject: "Holy Land Tour Registration Confirmation",
          emailType: "registration_confirmation",
          status: "sent",
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);

        // Log failed email
        await db.insert(emailLogs).values({
          recipient: customerEmail,
          subject: "Holy Land Tour Registration Confirmation",
          emailType: "registration_confirmation",
          status: "failed",
          errorMessage:
            emailError instanceof Error ? emailError.message : "Unknown error",
        });
      }
    }

    console.log("Registration completed successfully:", registrationId);
  } catch (error) {
    console.error("Error updating registration:", error);
  }
}

async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
) {
  console.log("Payment succeeded:", paymentIntent.id);
  // Additional logic for successful payments if needed
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log("Payment failed:", paymentIntent.id);

  // Find registration by payment intent ID and update status
  try {
    await db
      .update(registrations)
      .set({
        paymentStatus: "failed",
        updatedAt: new Date(),
      })
      .where(eq(registrations.stripePaymentId, paymentIntent.id));
  } catch (error) {
    console.error("Error updating failed payment:", error);
  }
}
