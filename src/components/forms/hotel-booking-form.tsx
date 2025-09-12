"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { roomTypes, RoomType } from "@/lib/data/room-types";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  Loader2,
  CheckCircle,
  Users,
  Star,
  Wifi,
} from "lucide-react";

// Simple booking form schema
const simpleBookingSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number required"),
  specialRequests: z.string().optional(),
});

type SimpleBookingData = z.infer<typeof simpleBookingSchema>;

export default function SimpleHotelBooking() {
  const [step, setStep] = useState<"catalog" | "details" | "payment">(
    "catalog"
  );
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numberOfNights = 10;
  const tourDates = "March 15-25, 2025";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SimpleBookingData>({
    resolver: zodResolver(simpleBookingSchema),
  });

  const handleRoomSelect = (room: RoomType) => {
    setSelectedRoom(room);
    setStep("details");
  };

  const handleBackToCatalog = () => {
    setStep("catalog");
    setSelectedRoom(null);
    reset();
  };

  const onSubmit = async (data: SimpleBookingData) => {
    if (!selectedRoom) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/hotel-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          roomType: selectedRoom.id,
          roomPrice: selectedRoom.pricePerNight,
          numberOfNights,
          totalAmount: selectedRoom.pricePerNight * numberOfNights,
          checkInDate: "2025-03-15",
          checkOutDate: "2025-03-25",
        }),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (error) {
      alert("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "catalog") {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
            Select Your <span className="text-gradient">Hotel Room</span>
          </h2>
          <p className="text-xl text-stone-600 mb-2">
            Choose from our premium accommodations for the Holy Land Tour
          </p>
          <p className="text-lg text-primary-600 font-semibold">
            {tourDates} • {numberOfNights} Nights
          </p>
        </div>

        {/* Room Catalog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomTypes.map((room) => {
            const totalPrice = room.pricePerNight * numberOfNights;
            const isAvailable = room.availableRooms > 0;

            return (
              <div
                key={room.id}
                className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${
                  isAvailable
                    ? "border-stone-200 hover:border-primary-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                    : "border-stone-200 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => isAvailable && handleRoomSelect(room)}
              >
                {/* Room Image */}
                <div className="relative h-48">
                  <Image
                    src={room.imageUrl}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                  {room.popular && (
                    <div className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  {room.upgrade && (
                    <div className="absolute top-3 right-3 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Premium
                    </div>
                  )}
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Fully Booked
                      </span>
                    </div>
                  )}
                </div>

                {/* Room Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-stone-900">
                        {room.name}
                      </h3>
                      <div className="flex items-center gap-2 text-stone-600 mt-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">
                          Up to {room.maxOccupancy} guests
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </div>
                  </div>

                  <p className="text-stone-600 text-sm mb-4 leading-relaxed">
                    {room.shortDescription}
                  </p>

                  {/* Key Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Wifi className="w-3 h-3" />
                        Free WiFi
                      </span>
                      <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded text-xs">
                        Breakfast Included
                      </span>
                      <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded text-xs">
                        Air Conditioning
                      </span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-4 text-sm">
                    {isAvailable ? (
                      <span className="text-green-600 font-medium">
                        ✓ {room.availableRooms} rooms available
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        ✗ Fully booked
                      </span>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="bg-stone-50 rounded-lg p-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-stone-600">Per night</div>
                      <div className="text-xl font-bold text-primary-600">
                        ${room.pricePerNight}
                      </div>
                      <div className="text-sm text-stone-500 mt-1">
                        Total: ${totalPrice.toLocaleString()} ({numberOfNights}{" "}
                        nights)
                      </div>
                    </div>
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => isAvailable && handleRoomSelect(room)}
                    disabled={!isAvailable}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                      isAvailable
                        ? "bg-primary-600 hover:bg-primary-700 text-white transform hover:scale-105"
                        : "bg-stone-300 text-stone-500 cursor-not-allowed"
                    }`}
                  >
                    {isAvailable ? "Select This Room" : "Unavailable"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (step === "details" && selectedRoom) {
    const totalAmount = selectedRoom.pricePerNight * numberOfNights;

    return (
      <div className="max-w-4xl mx-auto">
        {/* Selected Room Summary */}
        <div className="bg-primary-50 rounded-2xl p-6 mb-8 border border-primary-200">
          <div className="flex items-start gap-6">
            <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={selectedRoom.imageUrl}
                alt={selectedRoom.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-serif font-semibold text-stone-900 mb-2">
                {selectedRoom.name}
              </h3>
              <p className="text-stone-600 mb-4">{selectedRoom.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-stone-500">Dates:</span>
                  <div className="font-medium">{tourDates}</div>
                </div>
                <div>
                  <span className="text-stone-500">Duration:</span>
                  <div className="font-medium">{numberOfNights} nights</div>
                </div>
                <div>
                  <span className="text-stone-500">Rate:</span>
                  <div className="font-medium">
                    ${selectedRoom.pricePerNight}/night
                  </div>
                </div>
                <div>
                  <span className="text-stone-500">Total:</span>
                  <div className="font-bold text-primary-600">
                    ${totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleBackToCatalog}
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            ← Change Room Selection
          </button>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8"
        >
          <div className="text-center mb-8">
            <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
              Enter Your Details
            </h3>
            <p className="text-stone-600">
              We need your information to complete the booking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                First Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
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
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
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
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
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
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
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
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              {...register("specialRequests")}
              rows={3}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Any special requests? (e.g., ground floor, twin beds, dietary requirements...)"
            />
          </div>

          {/* Payment Summary */}
          <div className="bg-stone-50 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-primary-600" />
              <h4 className="text-lg font-semibold text-stone-900">
                Payment Summary
              </h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-600">{selectedRoom.name}</span>
                <span className="font-medium">
                  ${selectedRoom.pricePerNight}/night
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">{numberOfNights} nights</span>
                <span className="font-medium">
                  ${totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm text-stone-500">
                <span>Includes: Breakfast, WiFi, Taxes</span>
                <span>Included</span>
              </div>
              <div className="border-t border-stone-200 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-stone-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-primary-600">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleBackToCatalog}
              className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold py-4 rounded-lg transition-colors duration-200"
            >
              Back to Rooms
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {isSubmitting
                ? "Processing..."
                : `Book Now - $${totalAmount.toLocaleString()}`}
            </button>
          </div>

          <p className="text-stone-500 text-sm text-center mt-4">
            🔒 Your payment is secure and processed by Stripe
          </p>
        </form>
      </div>
    );
  }

  return null;
}
