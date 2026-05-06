import Hero, { HeroNav } from "@/components/landing/Hero";
import Countdown from "@/components/landing/Countdown";
import About from "@/components/landing/About";
import FAQ from "@/components/landing/FAQ";
import OpenPositions from "@/components/landing/OpenPositions";
import ApplyForm from "@/components/landing/ApplyForm";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Hero />
        <HeroNav />
        <div className="container max-w-6xl py-12 sm:py-16">
          <div className="frame relative bg-background">
            <span className="frame-corner-bl">+</span>
            <span className="frame-corner-br">+</span>
            <Countdown />
            <div className="border-t border-border" />
            <About />
            <div className="border-t border-border" />
            <ApplyForm />
            <div className="border-t border-border" />
            <OpenPositions />
            <div className="border-t border-border" />
            <FAQ />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
