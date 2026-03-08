import { HeroSection } from "@/components/landing/hero-section";
import { PhilosophySection } from "@/components/landing/philosophy-section";
import { SpectrumSection } from "@/components/landing/spectrum-section";
import { VisionSection } from "@/components/landing/vision-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PhilosophySection />
      <SpectrumSection />
      <VisionSection />
      <FooterSection />
    </main>
  );
}
