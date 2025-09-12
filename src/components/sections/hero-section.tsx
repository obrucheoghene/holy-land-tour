"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const tourDate = new Date(process.env.NEXT_PUBLIC_TOUR_DATE || "2025-03-15");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = tourDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [tourDate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hlt-pst1.jpg"
          alt="Jerusalem - Holy Land"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {/* Main Heading */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Holy Land Tour
          </h1>
          <div className="text-2xl md:text-3xl mb-4 text-primary-200">
            with Pastor Chris & Pastor Benny
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Experience the footsteps of Jesus in a life-changing spiritual
            journey through the Holy Land
          </p>
        </div>

        {/* Tour Details */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-lg">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <Calendar className="w-5 h-5 text-primary-300" />
            <span>December 10-15, 2025</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <MapPin className="w-5 h-5 text-primary-300" />
            <span>Israel</span>
          </div>
          {/* <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <Users className="w-5 h-5 text-primary-300" />
            <span>Limited to 50 Pilgrims</span>
          </div> */}
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <h3 className="text-2xl font-serif mb-6 text-primary-200">
            Tour Begins In:
          </h3>
          <div className="flex justify-center gap-4 md:gap-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-white/15 backdrop-blur-sm rounded-xl p-4 min-w-[80px]"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-300">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm uppercase tracking-wide text-gray-300">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button
              size="lg"
              className="btn-primary text-lg px-8 py-4 bg-primary-500 hover:bg-primary-600 transform hover:scale-105 transition-all duration-200"
            >
              Register Now
            </Button>
          </Link>
          <Link href="/hotel-booking">
            <Button
              size="lg"
              variant="outline"
              className="btn-outline text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-200"
            >
              Book Hotel
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1 h-3 bg-white/50 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
