"use client";

import { useState } from "react";
import Image from "next/image";
import {
  roomTypes,
  RoomType,
  calculateTotalPrice,
} from "@/lib/data/room-types";
import {
  Users,
  Star,
  Wifi,
  Car,
  Coffee,
  Utensils,
  CheckCircle,
  Crown,
  Heart,
} from "lucide-react";

interface RoomSelectionProps {
  onRoomSelect: (roomType: RoomType) => void;
  selectedRoomId?: string;
}

export default function RoomSelection({
  onRoomSelect,
  selectedRoomId,
}: RoomSelectionProps) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(
    selectedRoomId || null
  );
  const numberOfNights = 10; // Holy Land tour duration

  const handleRoomSelection = (roomType: RoomType) => {
    setSelectedRoom(roomType.id);
    onRoomSelect(roomType);
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes("wifi"))
      return <Wifi className="w-4 h-4" />;
    if (amenity.toLowerCase().includes("parking"))
      return <Car className="w-4 h-4" />;
    if (amenity.toLowerCase().includes("breakfast"))
      return <Coffee className="w-4 h-4" />;
    if (amenity.toLowerCase().includes("restaurant"))
      return <Utensils className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
          Choose Your <span className="text-gradient">Accommodation</span>
        </h2>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
          Select from our carefully chosen 4-star hotels throughout Israel. All
          rooms include breakfast, air conditioning, and are located near major
          biblical sites.
        </p>
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {roomTypes.map((roomType) => {
          const totalPrice = calculateTotalPrice(roomType.id, numberOfNights);
          const isSelected = selectedRoom === roomType.id;
          const isAvailable = roomType.availableRooms > 0;

          return (
            <div
              key={roomType.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${
                isSelected
                  ? "border-primary-500 shadow-xl transform scale-105"
                  : isAvailable
                  ? "border-stone-200 hover:border-primary-300 hover:shadow-xl hover:-translate-y-1"
                  : "border-stone-200 opacity-50"
              } ${!isAvailable ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => isAvailable && handleRoomSelection(roomType)}
            >
              {/* Popular Badge */}
              {roomType.popular && (
                <div className="absolute top-4 left-4 z-10 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              {/* Upgrade Badge */}
              {roomType.upgrade && (
                <div className="absolute top-4 right-4 z-10 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Crown className="w-4 h-4" />
                  Premium
                </div>
              )}

              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Selected
                </div>
              )}

              {/* Room Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={roomType.imageUrl}
                  alt={roomType.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
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
                {/* Room Name and Occupancy */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-stone-900 mb-1">
                      {roomType.name}
                    </h3>
                    <div className="flex items-center gap-2 text-stone-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">
                        Up to {roomType.maxOccupancy} guests
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  {roomType.shortDescription}
                </p>

                {/* Key Amenities */}
                <div className="mb-4">
                  <h4 className="font-semibold text-stone-900 mb-2 text-sm">
                    Key Features:
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {roomType.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                        <span className="text-xs text-stone-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-4 p-3 bg-stone-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">Availability:</span>
                    <span
                      className={`font-semibold ${
                        isAvailable ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isAvailable
                        ? `${roomType.availableRooms} rooms left`
                        : "Fully booked"}
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-primary-50 rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-stone-600 mb-1">Per night</div>
                    <div className="text-2xl font-bold text-primary-600 mb-1">
                      ${roomType.pricePerNight}
                    </div>
                    <div className="text-sm text-stone-500 mb-3">
                      Total for {numberOfNights} nights
                    </div>
                    <div className="text-xl font-bold text-stone-900">
                      ${totalPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Selection Button */}
                <button
                  onClick={() => isAvailable && handleRoomSelection(roomType)}
                  disabled={!isAvailable}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    isSelected
                      ? "bg-green-600 text-white"
                      : isAvailable
                      ? "bg-primary-600 hover:bg-primary-700 text-white hover:transform hover:scale-105"
                      : "bg-stone-300 text-stone-500 cursor-not-allowed"
                  }`}
                >
                  {isSelected
                    ? "Selected ✓"
                    : isAvailable
                    ? "Select Room"
                    : "Unavailable"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Information */}
      <div className="bg-stone-50 rounded-2xl p-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif font-semibold text-stone-900 mb-6 text-center">
            What's Included with Every Room
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 p-4 rounded-lg inline-block mb-3">
                <Coffee className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="font-semibold text-stone-900 mb-2">
                Daily Breakfast
              </h4>
              <p className="text-stone-600 text-sm">
                Full breakfast buffet included every morning
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary-100 p-4 rounded-lg inline-block mb-3">
                <Wifi className="w-8 h-8 text-secondary-600" />
              </div>
              <h4 className="font-semibold text-stone-900 mb-2">Free Wi-Fi</h4>
              <p className="text-stone-600 text-sm">
                High-speed internet throughout the hotel
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-100 p-4 rounded-lg inline-block mb-3">
                <Star className="w-8 h-8 text-accent-600" />
              </div>
              <h4 className="font-semibold text-stone-900 mb-2">
                4-Star Quality
              </h4>
              <p className="text-stone-600 text-sm">
                Comfortable, modern accommodations
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg inline-block mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-stone-900 mb-2">
                Prime Locations
              </h4>
              <p className="text-stone-600 text-sm">
                Near major biblical sites and attractions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Policies */}
      <div className="bg-white rounded-2xl border border-stone-200 p-8">
        <h3 className="text-xl font-serif font-semibold text-stone-900 mb-6">
          Hotel Booking Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-stone-900 mb-2">
              Check-in / Check-out
            </h4>
            <p className="text-stone-600 mb-1">Check-in: 3:00 PM</p>
            <p className="text-stone-600">Check-out: 11:00 AM</p>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-2">
              Cancellation Policy
            </h4>
            <p className="text-stone-600">
              Free cancellation up to 14 days before arrival. 50% refund for
              cancellations within 7-14 days.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-2">
              Special Requests
            </h4>
            <p className="text-stone-600">
              Dietary restrictions, accessibility needs, and room preferences
              can be noted during booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
