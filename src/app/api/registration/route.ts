import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registrations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import Stripe from "stripe";
import { sendConfirmationEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const registrationSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  dateOfBirth: z.string(),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(5),
  country: z.string(),
  emergencyContact: z.string().min(2),
  emergencyPhone: z.string().min(10),
  dietaryRestrictions: z.string().optional(),
  medicalConditions: z.string().optional(),
  registrationFee: z.number(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registrationSchema.parse(body);

    // Check if email already exists
    const existingRegistration = await db
      .select()
      .from(registrations)
      .where(eq(registrations.email, validatedData.email))
      .limit(1);

    if (existingRegistration.length > 0) {
      return NextResponse.json(
        { error: "This email is already registered for the tour" },
        { status: 400 }
      );
    }

    // Create registration record in database
    const [registration] = await db
      .insert(registrations)
      .values({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        dateOfBirth: validatedData.dateOfBirth,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        zipCode: validatedData.zipCode,
        country: validatedData.country,
        emergencyContact: validatedData.emergencyContact,
        emergencyPhone: validatedData.emergencyPhone,
        dietaryRestrictions: validatedData.dietaryRestrictions,
        medicalConditions: validatedData.medicalConditions,
        registrationFee: validatedData.registrationFee.toString(),
        paymentStatus: "pending",
      })
      .returning();

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Holy Land Tour Registration",
              description: `Registration for ${validatedData.firstName} ${validatedData.lastName} - March 15-25, 2025`,
              images: [
                "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400",
              ],
            },
            unit_amount: validatedData.registrationFee * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/registration/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/registration/cancelled`,
      metadata: {
        registrationId: registration.id,
        email: validatedData.email,
      },
      customer_email: validatedData.email,
    });

    // Update registration with Stripe session ID
    await db
      .update(registrations)
      .set({ stripePaymentId: session.id })
      .where(eq(registrations.id, registration.id));

    return NextResponse.json({
      registrationId: registration.id,
      clientSecret: session.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid registration data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const registrationId = searchParams.get("id");

    if (!registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    const registration = await db
      .select()
      .from(registrations)
      .where(eq(registrations.id, registrationId))
      .limit(1);

    if (registration.length === 0) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(registration[0]);
  } catch (error) {
    console.error("Get registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
