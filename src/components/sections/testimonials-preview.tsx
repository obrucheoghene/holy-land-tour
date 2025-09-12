"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Atlanta, GA",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?q=80&w=150",
    rating: 5,
    text: "This Holy Land tour was absolutely life-changing. Pastor Chris and Pastor Benny brought the Bible to life in ways I never imagined. Walking where Jesus walked gave me a deeper understanding of my faith.",
    highlight:
      "Walking in the Garden of Gethsemane was the most moving experience of my life.",
  },
  {
    id: 2,
    name: "Michael Thompson",
    location: "Dallas, TX",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
    rating: 5,
    text: "The organization was perfect, the sites were incredible, and our spiritual guides were phenomenal. I came back with a renewed sense of purpose and a heart full of gratitude.",
    highlight: "Baptism in the Jordan River was exactly what my soul needed.",
  },
  {
    id: 3,
    name: "Patricia Williams",
    location: "Phoenix, AZ",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
    rating: 5,
    text: "Every detail was thoughtfully planned. The small group size made it intimate and meaningful. I made lifelong friends and created memories that will last forever.",
    highlight: "Singing hymns at the Sea of Galilee brought tears to my eyes.",
  },
  {
    id: 4,
    name: "Robert Davis",
    location: "Nashville, TN",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    rating: 5,
    text: "As a deacon in my church, this tour deepened my biblical knowledge immensely. The pastors' teachings on location made scripture come alive in powerful ways.",
    highlight:
      "Standing on the Mount of Beatitudes while reading the Sermon on the Mount was unforgettable.",
  },
  {
    id: 5,
    name: "Jennifer Martinez",
    location: "Miami, FL",
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=150",
    rating: 5,
    text: "This was my first pilgrimage, and it exceeded every expectation. The spiritual growth I experienced in those 10 days was remarkable. I highly recommend this tour to anyone.",
    highlight:
      "Praying at the Western Wall was a moment I'll treasure forever.",
  },
];

export default function TestimonialsPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
    );
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setCurrentIndex(
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-stone-900">
            What People <span className="text-gradient">Say</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Hear from past pilgrims who experienced the transformative power of
            walking in the Holy Land. Their stories speak to the life-changing
            impact of this spiritual journey.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card-testimonial relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8">
              <div className="bg-primary-600 p-4 rounded-full">
                <Quote className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="pt-8">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-accent-500 fill-current"
                  />
                ))}
              </div>

              {/* Main Quote */}
              <blockquote className="text-xl md:text-2xl text-stone-700 leading-relaxed text-center mb-8 font-serif italic">
                {`"`}
                {currentTestimonial.text}
                {`"`}
              </blockquote>

              {/* Highlight */}
              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded-r-lg mb-8">
                <p className="text-lg text-primary-800 italic">
                  {`"`}
                  {currentTestimonial.highlight}
                  {`"`}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-serif font-semibold text-stone-900">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-stone-600">
                    {currentTestimonial.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <button
            onClick={goToPrev}
            className="bg-white hover:bg-primary-50 border-2 border-primary-600 text-primary-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary-600 scale-125"
                    : "bg-stone-300 hover:bg-primary-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="bg-white hover:bg-primary-50 border-2 border-primary-600 text-primary-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Small Testimonial Previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`card-holy cursor-pointer transition-all duration-300 hover-lift ${
                index === currentIndex % 3 ? "ring-2 ring-primary-600" : ""
              }`}
              onClick={() => goToSlide(index)}
            >
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-accent-500 fill-current"
                      />
                    ))}
                  </div>
                  <h4 className="font-semibold text-stone-900 mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-stone-600 mb-2">
                    {testimonial.location}
                  </p>
                  <p className="text-sm text-stone-700 line-clamp-3">
                    {testimonial.text.slice(0, 100)}...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">
            Ready to Create Your Own Story?
          </h3>
          <p className="text-lg text-stone-600 mb-8">
            Join us on this life-changing journey and experience the Holy Land
            for yourself
          </p>
          <button className="btn-primary px-8 py-3 text-lg">
            Register for Next Tour
          </button>
        </div>
      </div>
    </section>
  );
}
