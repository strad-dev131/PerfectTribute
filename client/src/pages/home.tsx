import { HeroSection } from "@/components/hero-section";
import { SayariGenerator } from "@/components/sayari-generator";
import { SkillsTribute } from "@/components/skills-tribute";
import { SayariWall } from "@/components/sayari-wall";
import { MemoryGame } from "@/components/memory-game";
import { BirthdayWishes } from "@/components/birthday-wishes";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ErrorBoundary } from "@/components/error-boundary";

export default function Home() {
  const scrollToWishes = () => {
    const wishesSection = document.querySelector('[data-testid="birthday-wishes-section"]');
    wishesSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen" data-testid="home-page">
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <SayariGenerator />
      </ErrorBoundary>

      <ErrorBoundary>
        <SkillsTribute />
      </ErrorBoundary>

      <ErrorBoundary>
        <SayariWall />
      </ErrorBoundary>

      <ErrorBoundary>
        <MemoryGame />
      </ErrorBoundary>

      <ErrorBoundary>
        <BirthdayWishes />
      </ErrorBoundary>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>

      {/* Floating Action Button for Quick Wish */}
      <div className="fixed bottom-6 right-6 z-50" data-testid="floating-action-button">
        <Button
          onClick={scrollToWishes}
          className="w-14 h-14 bg-gradient-to-r from-neon-cyan to-neon-gold rounded-full flex items-center justify-center text-dark-primary text-xl font-bold shadow-lg hover:scale-110 transition-all duration-300 animate-float"
          data-testid="scroll-to-wishes-button"
          aria-label="Scroll to birthday wishes section"
        >
          💌
        </Button>
      </div>
    </div>
  );
}