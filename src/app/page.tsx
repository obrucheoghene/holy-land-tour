import HeroSection from "@/components/sections/hero-section";
import TourHighlights from "@/components/sections/tour-highlight";
import ItineraryPreview from "@/components/sections/itinerary-preview";
import GalleryPreview from "@/components/sections/gallery-preview";
import TestimonialsPreview from "@/components/sections/testimonials-preview";
import FAQSection from "@/components/sections/faq";
import Footer from "@/components/sections/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <GalleryPreview />

      {/* <TourHighlights /> */}
      <ItineraryPreview />
      {/* <TestimonialsPreview /> */}
      <FAQSection />
      <Footer />
    </main>
  );
}
