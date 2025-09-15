import { Metadata } from "next";
import RegistrationForm from "@/components/forms/registration-form";
import { ArrowLeft, Shield, CreditCard, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register for Holy Land Tour | Pastor Chris & Pastor Benny",
  description:
    "Register for our transformative Holy Land tour. Secure your spot for this life-changing spiritual pilgrimage to Israel.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-primary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-stone-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-stone-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-serif font-bold text-stone-900">
                Holy Land Tour Registration
              </h1>
              <p className="text-stone-600">March 15-25, 2025</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Shield className="w-4 h-4" />
              <span>Secure Registration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
              Register for the{" "}
              <span className="text-gradient">Holy Land Tour</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Take the first step toward a transformative pilgrimage to the Holy
              Land.
            </p>
          </div>

          {/* Registration Form */}
          <RegistrationForm />

          {/* Support Information */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200">
              <h3 className="text-xl font-serif font-semibold text-stone-900 mb-4">
                Need Help with Registration?
              </h3>
              <p className="text-stone-600 mb-6">
                Our team is here to assist you with any questions about the
                registration process or tour details.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+15551234567" className="btn-primary px-6 py-3">
                  Call (555) 123-4567
                </a>
                <a
                  href="mailto:info@holylandtour.com"
                  className="btn-outline px-6 py-3"
                >
                  Email Support
                </a>
              </div>
              <p className="text-sm text-stone-500 mt-4">
                Support hours: Monday-Friday 9 AM - 6 PM EST
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
