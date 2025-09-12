import Image from "next/image";
import { MapPin, Star, Heart, Cross } from "lucide-react";

const highlights = [
  {
    title: "Walk Where Jesus Walked",
    description:
      "Experience the Sea of Galilee, Capernaum, and the Mount of Beatitudes where Jesus ministered.",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070",
    icon: Cross,
    features: [
      "Sea of Galilee boat ride",
      "Capernaum synagogue",
      "Mount of Beatitudes",
    ],
  },
  {
    title: "Jerusalem - The Holy City",
    description:
      "Explore the Western Wall, Via Dolorosa, and the Garden Tomb in the sacred city of Jerusalem.",
    image:
      "https://images.unsplash.com/photo-1544967881-18ca8ac7b5e8?q=80&w=2070",
    icon: Star,
    features: [
      "Western Wall prayers",
      "Via Dolorosa walk",
      "Garden Tomb worship",
    ],
  },
  {
    title: "Bethlehem & Nazareth",
    description:
      "Visit the birthplace and childhood home of Jesus Christ in these historic biblical cities.",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070",
    icon: Heart,
    features: ["Church of the Nativity", "Shepherds Field", "Nazareth Village"],
  },
  {
    title: "Dead Sea Experience",
    description:
      "Float in the lowest point on Earth and explore the ancient fortress of Masada.",
    image:
      "https://images.unsplash.com/photo-1544967882-7ad4b41b7de1?q=80&w=2070",
    icon: MapPin,
    features: ["Dead Sea floating", "Masada sunrise", "Qumran caves tour"],
  },
];

export default function TourHighlights() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900">
            Tour <span className="text-gradient">Highlights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Journey through the most sacred sites in Christianity, guided by
            experienced pastors who will bring the scriptures to life in the
            very places where they happened.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="card-elegant group hover-lift hover-glow"
            >
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={highlight.image}
                  alt={highlight.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="overlay-warm" />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-accent-500 p-2 rounded-lg">
                    <highlight.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-semibold mb-4 text-stone-900">
                  {highlight.title}
                </h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  {highlight.description}
                </p>

                <div className="space-y-2">
                  {highlight.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full" />
                      <span className="text-stone-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pastors Introduction */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-serif font-bold mb-4 text-gray-900">
                Your Spiritual Guides
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Pastor Chris and Pastor Benny bring over 30 years of combined
                ministry experience and deep biblical knowledge to guide you
                through this transformative journey.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Pastor Chris Johnson
                    </p>
                    <p className="text-gray-600">
                      15 years pastoral experience, Biblical archaeology
                      enthusiast
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Pastor Benny Williams
                    </p>
                    <p className="text-gray-600">
                      20 years ministry, Holy Land tour leader for 8 years
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070"
                alt="Pastor Chris and Pastor Benny"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
