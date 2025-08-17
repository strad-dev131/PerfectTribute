import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const { toast } = useToast();

  const handleViewSource = () => {
    toast({
      title: "Source Code Available! 📂",
      description: "This website is open source. Repository link would be shared by Sid Bhai!",
    });
  };

  const handleDeployOwn = () => {
    toast({
      title: "Deploy Your Own! ⚡",
      description: "One-click Netlify deployment coming soon! Contact Sid for setup.",
    });
  };

  return (
    <footer className="py-12 paisley-bg relative" data-testid="footer-section">
      <div className="container mx-auto px-4 text-center">
        
        {/* Special Thanks */}
        <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto mb-8" data-testid="special-thanks">
          <h3 className="text-2xl font-poppins font-bold text-gradient mb-4" data-testid="thanks-title">
            🙏 Special Thanks
          </h3>
          <p className="text-lg text-gray-300 mb-4" data-testid="thanks-message">
            "Big thanks to <span className="text-neon-gold font-semibold">Sid Bhai</span>, jo is website ko perfect banane mein madad ki!"
          </p>
          <p className="text-gray-400" data-testid="thanks-subtitle">
            This tribute website is made with lots of love and appreciation for our amazing Vivaan Bhai! ❤️
          </p>
        </div>
        
        {/* GitHub & Deployment Info */}
        <div className="glass-card rounded-xl p-6 max-w-lg mx-auto mb-8" data-testid="deployment-info">
          <h4 className="font-poppins font-semibold text-neon-cyan mb-3" data-testid="made-with-love-title">
            🚀 Made with Love
          </h4>
          <p className="text-sm text-gray-400 mb-4" data-testid="tech-info">
            Open source • Deployed on Netlify • Built for Vivaan
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={handleViewSource}
              className="px-4 py-2 border border-neon-cyan text-neon-cyan rounded-lg hover:bg-neon-cyan hover:text-dark-primary transition-all duration-300 text-sm"
              data-testid="button-view-source"
            >
              📂 View Source
            </Button>
            <Button
              variant="outline"
              onClick={handleDeployOwn}
              className="px-4 py-2 border border-neon-gold text-neon-gold rounded-lg hover:bg-neon-gold hover:text-dark-primary transition-all duration-300 text-sm"
              data-testid="button-deploy-own"
            >
              ⚡ Deploy Your Own
            </Button>
          </div>
        </div>
        
        {/* Final Message */}
        <div className="text-center" data-testid="final-message">
          <div className="font-dancing text-2xl text-gradient mb-2" data-testid="final-birthday-message">
            "Happy Birthday once again, Vivaan Bhai!" 🎂
          </div>
          <p className="text-gray-400 text-sm" data-testid="final-wishes">
            May this year bring you endless happiness, success, and amazing sayaris! 🌟
          </p>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-glass-border" data-testid="copyright">
          <p className="text-xs text-gray-500">
            © 2024 • Made with ❤️ for Vivaan • Crafted by Sid
          </p>
        </div>
      </div>
    </footer>
  );
}
