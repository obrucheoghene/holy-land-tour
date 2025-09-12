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
  MapPin,
  AlertTriangle,
  CreditCard,
  CheckCircle,
  Loader2,
} from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(5, "Please enter your full address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "ZIP code is required"),
  country: z.string().default("United States"),
  emergencyContact: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(10, "Emergency contact phone is required"),
  dietaryRestrictions: z.string().optional(),
  medicalConditions: z.string().optional(),
  agreeToTerms: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the terms and conditions"
    ),
  marketingOptIn: z.boolean().optional(),
});

type RegistrationData = z.infer<typeof registrationSchema>;

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
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      country: "United States",
      marketingOptIn: true,
    },
  });

  const registrationFee = isEarlyBird ? 249 : 299;

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegistrationData)[] = [];

    if (step === 1) {
      fieldsToValidate = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "dateOfBirth",
      ];
    } else if (step === 2) {
      fieldsToValidate = ["address", "city", "state", "zipCode", "country"];
    } else if (step === 3) {
      fieldsToValidate = ["emergencyContact", "emergencyPhone"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: RegistrationData) => {
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                Personal Information
              </h3>
              <p className="text-stone-600">
                {`Let's`} start with your basic information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="md:col-span-2">
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
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                Address Information
              </h3>
              <p className="text-stone-600">
                Where should we send important tour information?
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Street Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
                  <input
                    {...register("address")}
                    className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="123 Main Street"
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    City *
                  </label>
                  <input
                    {...register("city")}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Atlanta"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    State *
                  </label>
                  <input
                    {...register("state")}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="GA"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    {...register("zipCode")}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="30309"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Country *
                </label>
                <select
                  {...register("country")}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Other">Other</option>
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                Emergency Contact & Health
              </h3>
              <p className="text-stone-600">
                Important information for your safety and well-being
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Emergency Contact Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
                  <input
                    {...register("emergencyContact")}
                    className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Jane Doe"
                  />
                </div>
                {errors.emergencyContact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emergencyContact.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Emergency Contact Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
                  <input
                    {...register("emergencyPhone")}
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="(555) 987-6543"
                  />
                </div>
                {errors.emergencyPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emergencyPhone.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Dietary Restrictions
                </label>
                <textarea
                  {...register("dietaryRestrictions")}
                  rows={3}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Please list any dietary restrictions, allergies, or special meal requirements..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Medical Conditions
                </label>
                <textarea
                  {...register("medicalConditions")}
                  rows={3}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Please list any medical conditions, medications, or special needs we should be aware of..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                Review & Payment
              </h3>
              <p className="text-stone-600">
                Please review your information and complete payment
              </p>
            </div>

            {/* Registration Summary */}
            <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
              <h4 className="text-lg font-semibold text-stone-900 mb-4">
                Registration Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Pilgrim:</span>
                  <span className="font-medium">
                    {watch("firstName")} {watch("lastName")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Email:</span>
                  <span className="font-medium">{watch("email")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Phone:</span>
                  <span className="font-medium">{watch("phone")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Location:</span>
                  <span className="font-medium">
                    {watch("city")}, {watch("state")}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
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
                    ${isEarlyBird ? "299.00" : "299.00"}
                  </span>
                </div>

                {isEarlyBird && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Early Bird Discount:</span>
                    <span className="font-medium">-$50.00</span>
                  </div>
                )}

                <div className="border-t border-primary-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-stone-900">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-primary-600">
                      ${registrationFee}.00
                    </span>
                  </div>
                </div>
              </div>

              {isEarlyBird && (
                <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">
                      Early Bird Special Applied!
                    </span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    {`You've`} saved $50 by registering before February 15th,
                    2025.
                  </p>
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  {...register("agreeToTerms")}
                  type="checkbox"
                  className="mt-1 w-5 h-5 text-primary-600 border-stone-300 rounded focus:ring-primary-500"
                />
                <label className="text-sm text-stone-700">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-primary-600 hover:underline"
                    target="_blank"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="/refund-policy"
                    className="text-primary-600 hover:underline"
                    target="_blank"
                  >
                    Refund Policy
                  </a>
                  . I understand that this registration fee is non-refundable
                  within 30 days of the tour date. *
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">
                  {errors.agreeToTerms.message}
                </p>
              )}

              <div className="flex items-start gap-3">
                <input
                  {...register("marketingOptIn")}
                  type="checkbox"
                  className="mt-1 w-5 h-5 text-primary-600 border-stone-300 rounded focus:ring-primary-500"
                />
                <label className="text-sm text-stone-700">
                  I would like to receive updates about future Holy Land tours
                  and ministry events.
                </label>
              </div>
            </div>

            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800 font-medium">
                    Registration Error
                  </span>
                </div>
                <p className="text-red-700 text-sm mt-1">{submitError}</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                step >= stepNum
                  ? "bg-primary-600 border-primary-600 text-white"
                  : "bg-white border-stone-300 text-stone-400"
              }`}
            >
              {stepNum}
            </div>
          ))}
        </div>

        <div className="w-full bg-stone-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-sm text-stone-600 mt-2">
          <span>Personal Info</span>
          <span>Address</span>
          <span>Emergency & Health</span>
          <span>Payment</span>
        </div>
      </div>

      {/* Form Content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8"
      >
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 mt-8 border-t border-stone-200">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="btn-ghost px-6 py-3"
            >
              Previous
            </button>
          )}

          <div className="ml-auto">
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary px-8 py-3"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary px-8 py-3 flex items-center gap-3"
              >
                {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                {isSubmitting
                  ? "Processing..."
                  : `Pay $${registrationFee} & Register`}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
