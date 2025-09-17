"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loadStripe } from "@stripe/stripe-js";
import {
  User,
  Mail,
  Phone,
  Loader2,
  CheckCircle,
  CreditCard,
} from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const registrationSchema = z.object({
  title: z.string().min(1, "Select your title"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  kingschatId: z.string().min(3, "Please enter a kingschat username"),
  zone: z.string(),
  network: z.string(),
  country: z.string(),
  city: z.string().min(2, "City is required"),
});

type RegistrationType = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  onClose?: () => void;
}

export default function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isEarlyBird, setIsEarlyBird] = useState(true); // Check if before Feb 15

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<RegistrationType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      kingschatId: "",
      zone: "",
      network: "",
      country: "",
      city: "",
    },
  });

  const registrationFee = isEarlyBird ? 4500 : 5000;

  const onSubmit = async (data: RegistrationType) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Create registration in database
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          registrationFee,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const { registrationId, clientSecret } = await response.json();

      // Initialize Stripe payment
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: clientSecret,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}

      {/* Form Content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8"
      >
        <div className="space-y-6">
          <div className="text-center mb-8">
            <p className="text-stone-600 text-2xl font-medium">
              Kindly complete the form to register
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Title *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-stone-400" />

                <select
                  {...register("title")}
                  className="w-full pl-10 px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="Pastor">Pastor</option>
                  <option value="Deacon">Deacon</option>
                  <option value="Deaconess">Deaconess</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                </select>
              </div>
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                First Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
                <input
                  {...register("firstName")}
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Last Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
                <input
                  {...register("lastName")}
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="john.doe@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
                <input
                  {...register("phone")}
                  type="tel"
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Kingschat Username *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
                <input
                  {...register("kingschatId")}
                  type="tel"
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              {errors.kingschatId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.kingschatId.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Zone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
                <input
                  {...register("zone")}
                  type="tel"
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              {errors.zone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.zone.message}
                </p>
              )}
            </div>

            {/* <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Date of Birth *
              </label>
              <input
                {...register("dateOfBirth")}
                type="date"
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div> */}

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Network
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-stone-400" />

                <select
                  {...register("network")}
                  className="w-full pl-10 px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="TNI - Translators Network International">
                    TNI - Translators Network International
                  </option>
                  <option value="ISM - International School of Ministry">
                    ISM - International School of Ministry
                  </option>
                  <option value="GYLF - ">
                    GYLF - Global Youth Leaders Forum
                  </option>
                  <option value="REON - Rhapsody Evangelical Outreach Network">
                    REON - Rhapsody Evangelical Outreach Network
                  </option>
                  <option value="SON - Son of Ministry">
                    SON - Son of Ministry
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {errors.network && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.network.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Country *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-stone-400" />

                <select
                  {...register("country")}
                  className="w-full pl-10 px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="United State">United State</option>
                </select>
              </div>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                City *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-stone-400" />

                <input
                  {...register("city")}
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your city"
                />
              </div>
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-primary-600" />
              <h4 className="text-lg font-semibold text-stone-900">
                Payment Details
              </h4>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-stone-600">Registration Fee:</span>
                <span className="font-medium">
                  {isEarlyBird ? "5000" : "5000"} Espees
                </span>
              </div>

              {isEarlyBird && (
                <div className="flex justify-between items-center text-green-600">
                  <span>Early Registration Discount:</span>
                  <span className="font-medium">-500 Espees</span>
                </div>
              )}

              <div className="border-t border-primary-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-stone-900">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-primary-600">
                    {registrationFee} Espees
                  </span>
                </div>
              </div>
            </div>

            {isEarlyBird && (
              <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    Early Registration Special Applied!
                  </span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  {`You've`} saved 500 Espees by registering before October
                  15th, 2025.
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {isSubmitting ? "Processing..." : `Register`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
