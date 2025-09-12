import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import GoogleTranslate from "@/components/google-translate";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4 text-accent-300">
              Holy Land Tour
            </h3>
            <p className="text-lg text-stone-300 mb-4">
              with Pastor Chris & Pastor Benny
            </p>
            <p className="text-stone-400 leading-relaxed mb-6 max-w-md">
              Experience the transformative power of walking where Jesus walked.
              Join us for a spiritual pilgrimage that will deepen your faith and
              create memories that last a lifetime.
            </p>

            {/* Google Translate */}
            <div className="mb-6">
              <p className="text-sm text-stone-300 mb-2">
                {/* Choose Your Language: */}
              </p>
              {/* <GoogleTranslate /> */}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-serif font-semibold mb-6 text-white">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-stone-300 text-sm">Phone</p>
                  <p className="text-white font-medium">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-stone-300 text-sm">Email</p>
                  <p className="text-white font-medium">
                    info@holylandtour.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-stone-300 text-sm">Office</p>
                  <p className="text-white font-medium">
                    123 Ministry Lane
                    <br />
                    Atlanta, GA 30309
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif font-semibold mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#tour-highlights"
                  className="text-stone-300 hover:text-accent-300 transition-colors"
                >
                  Tour Highlights
                </a>
              </li>
              <li>
                <a
                  href="#itinerary"
                  className="text-stone-300 hover:text-accent-300 transition-colors"
                >
                  Itinerary
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-stone-300 hover:text-accent-300 transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-stone-300 hover:text-accent-300 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="text-stone-300 hover:text-accent-300 transition-colors"
                >
                  Register Now
                </a>
              </li>
              <li>
                <a
                  href="/hotel-booking"
                  className="text-stone-300 hover:text-accent-300 transition-colors"
                >
                  Book Hotel
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-stone-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-6">
              <p className="text-stone-300 font-medium">Follow Our Journey:</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-stone-800 hover:bg-primary-600 p-3 rounded-lg transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="bg-stone-800 hover:bg-primary-600 p-3 rounded-lg transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="bg-stone-800 hover:bg-primary-600 p-3 rounded-lg transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-accent px-6 py-2 text-sm">
                Register Now
              </button>
              <button className="btn-outline px-6 py-2 text-sm border-stone-600 text-stone-300 hover:bg-stone-700 hover:text-white">
                Download Brochure
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-6 border-t border-stone-800">
            <p className="text-stone-400 text-sm">
              © 2025 Holy Land Tour with Pastor Chris & Pastor Benny. All rights
              reserved.
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <a
                href="/privacy-policy"
                className="text-stone-400 hover:text-stone-300 text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-stone-400 hover:text-stone-300 text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/travel-insurance"
                className="text-stone-400 hover:text-stone-300 text-sm transition-colors"
              >
                Travel Insurance
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
