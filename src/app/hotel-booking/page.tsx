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
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200">
            <h3 className="text-xl font-serif font-semibold text-stone-900 mb-4">
              Need Help with your Booking?
            </h3>
            <p className="text-stone-600 mb-6">
              We are here to assist you with any questions about the
              registration process or tour details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-outline px-6 py-3">
                Contact Us Kingschat
              </button>
              {/* <button className="btn-outline px-6 py-3">
                  Schedule a Call
                </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
