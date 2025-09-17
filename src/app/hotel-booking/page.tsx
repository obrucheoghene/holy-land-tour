"use client";

import { ArrowLeft, Shield, Bed, CreditCard } from "lucide-react";
import Link from "next/link";
import SimpleHotelBooking from "@/components/hotel/room-selection";
import { RoomType } from "@/lib/data/room-types";

export default function HotelBookingPage() {
  const handleRoomSelect = (room: RoomType) => {
    console.log(room);
    // setSelectedRoom(room);
    // setStep("details");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-primary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-stone-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-stone-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>

            <div className="text-center">
              <h1 className="text-2xl font-serif font-bold text-stone-900">
                Hotel Booking
              </h1>
              <p className="text-stone-600">Holy Land Tour 2025</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <SimpleHotelBooking onRoomSelect={handleRoomSelect} />

        {/* Support */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200 max-w-lg mx-auto">
            <h3 className="text-lg font-serif font-semibold text-stone-900 mb-2">
              Need Help?
            </h3>
            <p className="text-stone-600 mb-4 text-sm">
              Our team is here to assist with your hotel booking
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+15551234567"
                className="btn-primary px-4 py-2 text-sm"
              >
                📞 (555) 123-4567
              </a>
              <a
                href="mailto:hotels@holylandtour.com"
                className="btn-outline px-4 py-2 text-sm"
              >
                ✉️ Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
