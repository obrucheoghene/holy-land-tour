import Image from "next/image";
import { MapPin, Star, Heart, Cross } from "lucide-react";

const highlights = [
  {
    title: "Biblical Teachings With Pastor Chris",
    description:
      "Experience the Sea of Galilee, Capernaum, and the Mount of Beatitudes where Jesus ministered.",
    image: "/assets/hlt-pst1.jpg",
  },
  {
    title: "Jerusalem - The Holy City",
    description:
      "Explore the Western Wall, Via Dolorosa, and the Garden Tomb in the sacred city of Jerusalem.",
    image: "/assets/hlt-pst2.jpg",
  },
  {
    title: "Sea of Galilee",
    description: "A boat ride on the sea of Galilee with Pastor Chris",
    image: "/assets/hlt-pst3.jpg",
  },
  {
    title: "Dead Sea Experience",
    description:
      "Float in the lowest point on Earth and explore the ancient fortress of Masada.",
    image: "/assets/hlt-pst4.jpg",
  },
];

export default function TourHighlights() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900">
            Previous Tour <span className="text-gradient">Highlights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A glimpse of the 2016 and 2018 Holy Land Tour With Pastor Chris
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="card-elegant group hover-lift hover-glow"
            >
              <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                <Image
                  src={highlight.image}
                  alt={highlight.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="overlay-warm" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-semibold mb-4 text-stone-900">
                  {highlight.title}
                </h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pastors Introduction */}
      </div>
    </section>
  );
}
