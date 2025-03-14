import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import TechStack from "@/components/home/tech-stack";
import ServicesSection from "@/components/home/services-section";
import ProcessSection from "@/components/home/process-section";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <TechStack />
        <ServicesSection />
        <ProcessSection />
      </main>
      <Footer />
    </div>
  );
}
