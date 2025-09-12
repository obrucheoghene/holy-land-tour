import { XCircle, RefreshCw, Home, Phone } from "lucide-react";
import Link from "next/link";

export default function RegistrationCancelled() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-stone-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Cancel Icon */}
        <div className="mb-8">
          <div className="bg-red-100 p-6 rounded-full inline-block mb-6">
            <XCircle className="w-16 h-16 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
            Registration Cancelled
          </h1>
          <p className="text-xl text-stone-600">
            Your payment was not completed
          </p>
        </div>

        {/* Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8 mb-8">
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-4">
            What Happened?
          </h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            Your registration for the Holy Land Tour was not completed because
            the payment process was cancelled or interrupted. {`Don't`} worry -
            no charges were made to your payment method.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-semibold text-amber-800 mb-3">
              Your Spot is Still Available
            </h3>
            <p className="text-amber-700 text-sm">
              We understand that technical issues or second thoughts can happen.
              Your information has not been saved, and you can restart the
              registration process at any time. Our early bird discount is still
              available until February 15th, 2025.
            </p>
          </div>
        </div>

        {/* Action Options */}
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8 mb-8">
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-6">
            What Would You Like to Do?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-primary-50 rounded-xl border border-primary-200">
              <RefreshCw className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold text-stone-900 mb-3">Try Again</h3>
              <p className="text-stone-600 text-sm mb-4">
                Ready to complete your registration? Start the process again
                with all your information.
              </p>
              <Link href="/register" className="btn-primary px-6 py-2 text-sm">
                Register Now
              </Link>
            </div>

            <div className="text-center p-6 bg-stone-50 rounded-xl border border-stone-200">
              <Home className="w-12 h-12 text-stone-600 mx-auto mb-4" />
              <h3 className="font-semibold text-stone-900 mb-3">Learn More</h3>
              <p className="text-stone-600 text-sm mb-4">
                Need more information about the tour before registering? Review
                our details.
              </p>
              <Link href="/" className="btn-outline px-6 py-2 text-sm">
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8 mb-8">
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-6">
            Common Questions
          </h2>

          <div className="space-y-4 text-left">
            <div>
              <h4 className="font-semibold text-stone-900 mb-2">
                Was I charged for the cancelled registration?
              </h4>
              <p className="text-stone-600 text-sm">
                No, no charges were made to your payment method. The payment was
                cancelled before processing.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-stone-900 mb-2">
                Is my spot still available?
              </h4>
              <p className="text-stone-600 text-sm">
                Yes, since the registration {`wasn't`} completed, your spot
                remains available. You can register again at any time.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-stone-900 mb-2">
                Will I still get the early bird discount?
              </h4>
              <p className="text-stone-600 text-sm">
                Yes, as long as you register before February 15th, 2025,{" "}
                {`you'll`}
                still receive the $50 early bird discount.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-stone-900 mb-2">
                What if {`I'm`} having payment issues?
              </h4>
              <p className="text-stone-600 text-sm">
                Contact our support team for assistance with payment methods or
                technical issues. {`We're`} here to help!
              </p>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="bg-stone-100 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Phone className="w-6 h-6 text-primary-600" />
            <h3 className="font-semibold text-stone-900">Need Help?</h3>
          </div>
          <p className="text-stone-600 mb-4">
            If you encountered technical difficulties or have questions about
            the registration process, our team is ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+15551234567"
              className="text-primary-600 hover:underline font-medium"
            >
              📞 Call (555) 123-4567
            </a>
            <a
              href="mailto:info@holylandtour.com"
              className="text-primary-600 hover:underline font-medium"
            >
              ✉️ Email Support
            </a>
          </div>
          <p className="text-stone-500 text-sm mt-3">
            Support hours: Monday-Friday, 9 AM - 6 PM EST
          </p>
        </div>

        {/* Encouragement Message */}
        <div className="mt-8 p-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl">
          <h3 className="font-serif font-semibold text-xl mb-3">
            Your Journey Awaits
          </h3>
          <p className="opacity-95">
            {`Don't`} let a technical hiccup keep you from this life-changing
            spiritual experience.
            {`We're`} here to help you every step of the way to the Holy Land.
          </p>
        </div>
      </div>
    </div>
  );
}
