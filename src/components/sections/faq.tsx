"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Plane,
  CreditCard,
  MapPin,
  Clock,
  Users,
  Shield,
} from "lucide-react";

const faqCategories = [
  {
    category: "Registration & Payment",
    icon: CreditCard,
    color: "text-primary-600",
    bgColor: "bg-primary-100",
    questions: [
      {
        question: "How do I register for the Holy Land Tour?",
        answer:
          "Registration is simple! Click the \"Register Now\" button and fill out our secure online form. You'll need to provide personal information, and complete the registration fee payment with Espees. You'll receive a confirmation email immediately after successful registration.",
      },
      {
        question: "What is the registration fee and what does it include?",
        answer:
          "The registration fee is 3000 Espees and includes all guided tours, entrance fees to biblical sites, daily breakfast and dinner, comfortable accommodation, air-conditioned transportation, and spiritual guidance from Pastor Chris and Pastor Benny. International flights and lunch are not included.",
      },
      {
        question: "Is there an early registration discount?",
        answer:
          "Yes! Register by October 15th, 2025, and save $250 on your registration fee. This brings your total to $2750. We encourage early registration as spots are limited to few pilgrims.",
      },
      {
        question: "What is your refund policy?",
        answer:
          "Cancellations made 90+ days before departure receive a full refund minus $50 processing fee. Cancellations 30-89 days before departure receive 50% refund. Cancellations within 30 days are non-refundable. We strongly recommend travel insurance.",
      },
    ],
  },
  {
    category: "Travel & Accommodation",
    icon: Plane,
    color: "text-secondary-600",
    bgColor: "bg-secondary-100",
    questions: [
      {
        question: "Do you help with flight arrangements?",
        answer:
          "While flights are not included in the tour package, we provide detailed flight information and can recommend travel agents. We'll coordinate group arrivals in Tel Aviv and provide airport transfers for those arriving on our recommended flights.",
      },
      {
        question: "What type of accommodation is provided?",
        answer:
          "We stay in comfortable 5-star hotels throughout Israel. All rooms are air-conditioned with private bathrooms. You can choose between single occupancy, double occupancy, or upgrade to suites. Hotel booking is separate from registration and can be done through our hotel booking system.",
      },
      {
        question: "What should I pack for the Holy Land?",
        answer:
          "Pack comfortable walking shoes, modest clothing for religious sites, sun protection, layers for varying temperatures, and a small daypack. We'll provide a detailed packing list upon registration. Remember to bring a hat and sunscreen as we'll spend considerable time outdoors.",
      },
      {
        question: "Do I need a visa to visit Israel?",
        answer:
          "US citizens do not need a visa for visits under 90 days. Your passport must be valid for at least 6 months beyond your travel date. We'll provide detailed entry requirements and assist with any documentation questions during the registration process.",
      },
    ],
  },
  {
    category: "Tour Details",
    icon: MapPin,
    color: "text-accent-600",
    bgColor: "bg-accent-100",
    questions: [
      {
        question: "What biblical sites will we visit?",
        answer:
          "Our comprehensive 10-day itinerary includes Jerusalem (Western Wall, Via Dolorosa, Garden Tomb), Bethlehem (Church of the Nativity), Sea of Galilee (Capernaum, Mount of Beatitudes), Nazareth, Jordan River baptismal site, Dead Sea, Masada, Jericho, and Emmaus. Each site includes spiritual reflection time and biblical teaching.",
      },
      {
        question: "How much walking is involved?",
        answer:
          "The tour involves moderate walking on uneven terrain, steps, and cobblestone streets. Most sites require 1-3 hours of walking. We take frequent breaks and provide time for rest. Please inform us of any mobility concerns during registration so we can accommodate your needs.",
      },
      {
        question: "What makes this tour different from others?",
        answer:
          "Our tour is limited to 50 people for an intimate experience. Pastor Chris and Pastor Benny provide deep biblical context at each location, bringing scripture to life. We include exclusive access to some sites, daily devotionals, and opportunities for personal reflection and group worship.",
      },
      {
        question: "Is the tour suitable for children?",
        answer:
          "Children 12 and older are welcome with adult supervision. The tour involves significant walking and may be challenging for younger children. We can provide special accommodations and age-appropriate materials for young pilgrims when notified in advance.",
      },
    ],
  },
  {
    category: "Health & Safety",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-100",
    questions: [
      {
        question: "What health precautions should I take?",
        answer:
          "No special vaccinations are required for Israel. Bring any personal medications in original containers. We recommend travel insurance that covers medical emergencies. Our guides are trained in first aid, and we maintain contact with local medical facilities throughout the tour.",
      },
      {
        question: "Is it safe to travel to the Holy Land?",
        answer:
          "Yes, Israel maintains high security standards and we work with experienced local guides who monitor conditions daily. Our itinerary focuses on peaceful, tourist-friendly areas. We have contingency plans and maintain communication with local authorities and the US Embassy.",
      },
      {
        question: "What if I have dietary restrictions?",
        answer:
          "We accommodate most dietary needs including vegetarian, gluten-free, and kosher requirements. Please specify all dietary restrictions and allergies during registration. Our hotels and restaurants are experienced with international visitors and various dietary needs.",
      },
      {
        question: "What emergency procedures are in place?",
        answer:
          "We have 24/7 emergency contacts, comprehensive travel insurance options, and partnerships with local medical facilities. All participants receive emergency contact information and our guides carry communication devices. We also maintain contact with families back home if needed.",
      },
    ],
  },
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const activeQuestions = faqCategories[activeCategory].questions;

  return (
    <section className="py-20 section-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-stone-900">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about joining our Holy Land pilgrimage.
            {` Can't`} find your answer? Contact us directly for personalized
            assistance.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Category Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {faqCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover-lift ${
                  activeCategory === index
                    ? `border-primary-600 ${category.bgColor} shadow-lg`
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <div
                  className={`${category.bgColor} p-3 rounded-lg inline-block mb-4`}
                >
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <h3 className="font-serif font-semibold text-stone-900 mb-2">
                  {category.category}
                </h3>
                <p className="text-sm text-stone-600">
                  {category.questions.length} questions
                </p>
              </button>
            ))}
          </div>

          {/* Questions Accordion */}
          <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
            <div className="p-8 border-b border-stone-200">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`${faqCategories[activeCategory].bgColor} p-3 rounded-lg`}
                >
                  {/* < faqCategories[activeCategory].icon className={`w-6 h-6 ${faqCategories[activeCategory].color}`} /> */}
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  {faqCategories[activeCategory].category}
                </h3>
              </div>
              <p className="text-stone-600">
                Click on any question below to see the detailed answer.
              </p>
            </div>

            <div className="divide-y divide-stone-200">
              {activeQuestions.map((item, index) => {
                const itemId = `${activeCategory}-${index}`;
                const isOpen = openItems.includes(itemId);

                return (
                  <div key={itemId} className="group">
                    <button
                      onClick={() => toggleItem(itemId)}
                      className="w-full p-8 text-left hover:bg-stone-50 transition-colors duration-200 focus:outline-none focus:bg-stone-50"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-stone-900 pr-8 group-hover:text-primary-600 transition-colors">
                          {item.question}
                        </h4>
                        <ChevronDown
                          className={`w-6 h-6 text-stone-400 transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-8 pb-8">
                        <div className="bg-stone-50 rounded-lg p-6 border-l-4 border-primary-600">
                          <p className="text-stone-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <div className="card-holy max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <HelpCircle className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  Still Have Questions?
                </h3>
              </div>
              <p className="text-lg text-stone-600 mb-8">
                We are here to help you with any additional questions about your
                Holy Land pilgrimage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary px-6 py-3">
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
    </section>
  );
}
