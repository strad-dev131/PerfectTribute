import { useEffect } from 'react';
import { useDeviceDetection } from '@/hooks/use-device-detection';

export function AccessibilityEnhancer() {
  const deviceInfo = useDeviceDetection();

  useEffect(() => {
    // Add dynamic font size based on device
    const updateFontSize = () => {
      const root = document.documentElement;
      if (deviceInfo.isMobile) {
        root.style.fontSize = deviceInfo.screenSize === 'xs' ? '14px' : '15px';
      } else if (deviceInfo.isTablet) {
        root.style.fontSize = '16px';
      } else {
        root.style.fontSize = '16px';
      }
    };

    // Improve touch targets on mobile
    const improveTouchTargets = () => {
      if (deviceInfo.isTouchDevice) {
        const style = document.createElement('style');
        style.textContent = `
          button, a, input, textarea, [role="button"] {
            min-height: 44px !important;
            min-width: 44px !important;
          }
          
          .countdown-digit {
            touch-action: manipulation;
          }
          
          /* Prevent zoom on input focus for iOS */
          input, textarea, select {
            font-size: 16px !important;
          }
        `;
        document.head.appendChild(style);
      }
    };

    // Add focus management
    const enhanceFocusManagement = () => {
      // Skip link for keyboard navigation
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-neon-cyan focus:text-dark-primary focus:px-4 focus:py-2 focus:rounded-lg';
      document.body.insertBefore(skipLink, document.body.firstChild);

      // Add main content landmark
      const mainContent = document.querySelector('[data-testid="home-page"]');
      if (mainContent) {
        mainContent.setAttribute('id', 'main-content');
        mainContent.setAttribute('role', 'main');
      }
    };

    // Add language attributes
    const addLanguageSupport = () => {
      document.documentElement.lang = 'en';
      
      // Mark Hinglish content
      const hinglishElements = document.querySelectorAll('[data-testid*="sayari"], [data-testid*="wish"]');
      hinglishElements.forEach(el => {
        if (el.textContent && /[हिं]/g.test(el.textContent)) {
          el.setAttribute('lang', 'hi-IN');
        }
      });
    };

    // Apply all enhancements
    updateFontSize();
    improveTouchTargets();
    enhanceFocusManagement();
    addLanguageSupport();

    // Cleanup
    return () => {
      // Remove dynamically added styles if needed
    };
  }, [deviceInfo]);

  return null; // This component doesn't render anything
}