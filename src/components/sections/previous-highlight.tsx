"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    type: "image",
    src: "/assets/hlt-pst-12.jpg",
    alt: "Jerusalem Old City",
    title: "Jerusalem Old City",
    description: "Walking through the ancient streets of Jerusalem",
  },
  {
    id: 2,
    type: "image",
    src: "/assets/hlt-pst15.jpg",
    alt: "Sea of Galilee",
    title: "Sea of Galilee",
    description: "Peaceful moments by the Sea of Galilee",
  },
  {
    id: 3,
    type: "image",
    src: "/assets/hlt-pst10.jpg",
    alt: "Bethlehem Tour",
    title: "Bethlehem Experience",
    description: "Previous tour participants share their experience",
  },
  {
    id: 4,
    type: "image",
    src: "/assets/hlt-pst-8.jpg",
    alt: "Dead Sea",
    title: "Dead Sea Float",
    description: "The unique experience of floating in the Dead Sea",
  },
  {
    id: 5,
    type: "image",
    src: "/assets/hlt-pst9.jpg",
    alt: "Group Prayer",
    title: "Group Prayer",
    description: "Spiritual moments with fellow pilgrims",
  },
  {
    id: 6,
    type: "image",
    src: "/assets/hlt-pst14.jpg",
    alt: "Western Wall",
    title: "Western Wall",
    description: "Prayers at the holiest site in Judaism",
  },
];

export default function PreviousHighlight() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setSelectedItem(galleryItems[index].id);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % galleryItems.length;
    setCurrentIndex(newIndex);
    setSelectedItem(galleryItems[newIndex].id);
  };

  const prevImage = () => {
    const newIndex =
      currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedItem(galleryItems[newIndex].id);
  };

  return (
    <section className="py-20 section-sage">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-stone-900">
            Previous Tour <span className="text-gradient">Highlights</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Get a glimpse of the incredible experiences and sacred moments from
            previous Holy Land tours with Pastor Chris. See the places{" "}
            {`you'll`} visit and the memories {`you'll`} create.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative cursor-pointer hover-lift"
              // onClick={() => openLightbox(index)}
            >
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play Button for Videos */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-primary-600" />
                    </div>
                  </div>
                )}

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-xl font-serif font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>

                {/* Corner Badge */}
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.type === "video" ? "Video" : "Photo"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 p-2 rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 p-2 rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <div className="relative w-full h-[80vh]">
              <Image
                src={galleryItems[currentIndex].src}
                alt={galleryItems[currentIndex].alt}
                fill
                className=" w-full h-full"
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="text-2xl font-serif font-semibold mb-2">
                {galleryItems[currentIndex].title}
              </h3>
              <p className="text-lg opacity-90">
                {galleryItems[currentIndex].description}
              </p>
              <p className="text-sm opacity-75 mt-2">
                {currentIndex + 1} of {galleryItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
