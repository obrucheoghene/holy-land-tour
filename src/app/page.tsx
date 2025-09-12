import HeroSection from "@/components/sections/hero-section";
import ItineraryPreview from "@/components/sections/itinerary-preview";
import PreviousHighlight from "@/components/sections/previous-highlight";
import FAQSection from "@/components/sections/faq";
import Footer from "@/components/sections/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PreviousHighlight />

      <ItineraryPreview />
      <FAQSection />
      <Footer />
    </main>
  );
}
