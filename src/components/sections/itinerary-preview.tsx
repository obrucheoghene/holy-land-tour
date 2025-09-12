import { MapPin, Clock, Users } from "lucide-react";

const sites = [
  {
    name: "Jerusalem",
    highlights: ["Western Wall", "Via Dolorosa", "Garden Tomb", "Temple Mount"],
    duration: "3 days",
    significance: "The Holy City where Jesus was crucified and resurrected",
  },
  {
    name: "Bethlehem",
    highlights: ["Church of the Nativity", "Shepherds Field", "Milk Grotto"],
    duration: "1 day",
    significance: "Birthplace of Jesus Christ",
  },
  {
    name: "Sea of Galilee",
    highlights: ["Capernaum", "Mount of Beatitudes", "Boat Ride", "Tabgha"],
    duration: "2 days",
    significance: "Where Jesus called his disciples and performed miracles",
  },
  {
    name: "Nazareth",
    highlights: [
      "Church of Annunciation",
      "Nazareth Village",
      "Mount Precipice",
    ],
    duration: "1 day",
    significance: "Childhood home of Jesus",
  },
  {
    name: "Jordan River",
    highlights: ["Baptismal Site", "Qasr al-Yahud", "Renewal Ceremony"],
    duration: "Half day",
    significance: "Where Jesus was baptized by John the Baptist",
  },
  {
    name: "Dead Sea & Masada",
    highlights: ["Masada Fortress", "Dead Sea Float", "Qumran Caves"],
    duration: "1 day",
    significance: "Ancient fortress and lowest point on Earth",
  },
  {
    name: "Jericho",
    highlights: ["Tell es-Sultan", "Mount of Temptation", "Sycamore Tree"],
    duration: "Half day",
    significance: "One of the oldest cities in the world",
  },
  {
    name: "Emmaus",
    highlights: ["Emmaus Road", "Biblical Gardens", "Breaking of Bread"],
    duration: "Half day",
    significance: "Where Jesus appeared to disciples after resurrection",
  },
];

export default function ItineraryPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900">
            Sacred <span className="text-gradient">Sites</span>
            {` We'll`} Visit
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our carefully planned itinerary covers the most significant biblical
            locations, allowing time for reflection, worship, and deep spiritual
            connection.
          </p>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {sites.map((site, index) => (
            <div key={index} className="group">
              <div className="card-holy h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Site Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                      {site.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{site.duration}</span>
                    </div>
                  </div>
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                </div>

                {/* Significance */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {site.significance}
                </p>

                {/* Highlights */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Key Highlights:
                  </h4>
                  <div className="space-y-2">
                    {site.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={highlightIndex}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full" />
                        <span className="text-sm text-gray-700">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-200 rounded-xl transition-colors duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Tour Details Summary */}
        <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-white p-4 rounded-xl shadow-sm mb-4 inline-block">
                <MapPin className="w-8 h-8 text-secondary-500" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                10 Days
              </h3>
              <p className="text-gray-600">
                Full immersion in biblical history and spirituality
              </p>
            </div>

            <div>
              <div className="bg-white p-4 rounded-xl shadow-sm mb-4 inline-block">
                <Users className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Small Group
              </h3>
              <p className="text-gray-600">
                Intimate experience with maximum 50 participants
              </p>
            </div>

            <div>
              <div className="bg-white p-4 rounded-xl shadow-sm mb-4 inline-block">
                <Clock className="w-8 h-8 text-secondary-500" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                All Inclusive
              </h3>
              <p className="text-gray-600">
                Accommodations, meals, and guided tours included
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to walk in the footsteps of Jesus?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-3 text-lg">
              View Full Itinerary
            </button>
            <button className="btn-outline px-8 py-3 text-lg">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
