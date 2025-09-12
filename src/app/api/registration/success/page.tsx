import { Suspense } from "react";
import { CheckCircle, Mail, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-primary-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="bg-green-100 p-6 rounded-full inline-block mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
            Registration Successful!
          </h1>
          <p className="text-xl text-stone-600">
            Welcome to your Holy Land pilgrimage journey
          </p>
        </div>

        {/* Confirmation Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8 mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-serif font-semibold text-stone-900">
              Confirmation Email Sent
            </h2>
          </div>

          <p className="text-stone-600 leading-relaxed mb-6">
            A detailed confirmation email has been sent to your registered email
            address. This email contains your registration details, tour
            information, and next steps for your spiritual journey.
          </p>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <h3 className="font-semibold text-primary-800 mb-3">
              {`What's`} Included in Your Confirmation:
            </h3>
            <ul className="text-sm text-primary-700 space-y-2 text-left max-w-md mx-auto">
              <li>• Registration ID and payment confirmation</li>
              <li>• Complete tour itinerary and schedule</li>
              <li>• Packing list and travel recommendations</li>
              <li>• Contact information for questions</li>
              <li>• Pre-tour orientation meeting details</li>
            </ul>
          </div>
        </div>

        {/* Tour Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
            <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="font-semibold text-stone-900 mb-2">Tour Dates</h3>
            <p className="text-stone-600">March 15-25, 2025</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
            <MapPin className="w-8 h-8 text-secondary-600 mx-auto mb-4" />
            <h3 className="font-semibold text-stone-900 mb-2">Destination</h3>
            <p className="text-stone-600">Israel & Palestine</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
            <Users className="w-8 h-8 text-accent-600 mx-auto mb-4" />
            <h3 className="font-semibold text-stone-900 mb-2">Group Size</h3>
            <p className="text-stone-600">Max 50 Pilgrims</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8 mb-8">
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-6">
            Your Next Steps
          </h2>

          <div className="space-y-4 text-left max-w-lg mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-secondary-100 p-2 rounded-lg flex-shrink-0">
                <span className="text-secondary-600 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900">
                  Book Your Hotel
                </h4>
                <p className="text-stone-600 text-sm">
                  Secure your accommodation through our hotel booking system
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-accent-100 p-2 rounded-lg flex-shrink-0">
                <span className="text-accent-600 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900">
                  Prepare for Departure
                </h4>
                <p className="text-stone-600 text-sm">
                  Follow our packing guide and complete required documentation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/hotel-booking" className="btn-primary px-8 py-3 text-lg">
            Book Hotel Now
          </Link>
          <Link href="/" className="btn-outline px-8 py-3 text-lg">
            Return to Home
          </Link>
        </div>

        {/* Support Information */}
        <div className="bg-stone-100 rounded-xl p-6">
          <h3 className="font-semibold text-stone-900 mb-3">
            Need Assistance?
          </h3>
          <p className="text-stone-600 mb-4">
            Our team is here to help with any questions about your registration
            or upcoming tour.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+15551234567"
              className="text-primary-600 hover:underline font-medium"
            >
              📞 (555) 123-4567
            </a>
            <a
              href="mailto:info@holylandtour.com"
              className="text-primary-600 hover:underline font-medium"
            >
              ✉️ info@holylandtour.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
