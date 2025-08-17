import { useCountdown } from "@/hooks/use-countdown";
import vivaanPhoto from "@assets/image_1755445310004.png";

export function HeroSection() {
  const countdown = useCountdown('2025-08-18T00:00:00');

  return (
    <section className="min-h-screen flex items-center justify-center paisley-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-neon-cyan opacity-5 animate-float"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full bg-neon-gold opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 rounded-full bg-neon-cyan opacity-5 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Vivaan's Photo with Creative Frame */}
          <div className="photo-frame rounded-3xl mx-auto mb-8 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-glow-pulse" data-testid="hero-photo-frame">
            <img 
              src={vivaanPhoto} 
              alt="Vivaan - The Legend himself" 
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
              data-testid="hero-vivaan-photo"
              loading="eager"
              decoding="async"
            />
          </div>
          
          {/* Main Greeting */}
          <h1 className="hero-title font-poppins font-bold mb-4 text-gradient glow-text animate-slide-up" data-testid="hero-title">
            🎉 Happy Birthday Vivaan Bhai! 🎉
          </h1>
          
          <p className="hero-subtitle font-poppins mb-8 text-gray-300 animate-slide-up" style={{ animationDelay: '0.2s' }} data-testid="hero-subtitle">
            <span className="text-neon-cyan font-semibold">The Legend</span> of <span className="text-neon-gold">The Global Hub</span>, 
            <span className="text-neon-gold">The Gossip Edge</span>, and <span className="text-neon-gold">TeamX</span>!
          </p>
          
          {/* Countdown Timer */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }} data-testid="countdown-section">
            <p className="text-lg font-poppins mb-4 text-neon-cyan">🕐 Next Birthday Countdown:</p>
            <div className="flex justify-center gap-2 md:gap-4 flex-wrap max-w-sm md:max-w-none mx-auto" data-testid="countdown-timer">
              <div className="countdown-digit rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[80px]" data-testid="countdown-days">
                <div className="text-xl md:text-2xl font-bold text-neon-gold" suppressHydrationWarning>{countdown.days}</div>
                <div className="text-xs md:text-sm text-gray-300">Days</div>
              </div>
              <div className="countdown-digit rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[80px]" data-testid="countdown-hours">
                <div className="text-xl md:text-2xl font-bold text-neon-gold" suppressHydrationWarning>{countdown.hours}</div>
                <div className="text-xs md:text-sm text-gray-300">Hours</div>
              </div>
              <div className="countdown-digit rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[80px]" data-testid="countdown-minutes">
                <div className="text-xl md:text-2xl font-bold text-neon-gold" suppressHydrationWarning>{countdown.minutes}</div>
                <div className="text-xs md:text-sm text-gray-300">Minutes</div>
              </div>
              <div className="countdown-digit rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[80px]" data-testid="countdown-seconds">
                <div className="text-xl md:text-2xl font-bold text-neon-gold" suppressHydrationWarning>{countdown.seconds}</div>
                <div className="text-xs md:text-sm text-gray-300">Seconds</div>
              </div>
            </div>
          </div>
          
          {/* Scroll Down Indicator */}
          <div className="animate-bounce mt-12" data-testid="scroll-indicator">
            <p className="text-gray-400 text-sm mb-2">Scroll down for surprises! ⬇️</p>
          </div>
        </div>
      </div>
    </section>
  );
}
