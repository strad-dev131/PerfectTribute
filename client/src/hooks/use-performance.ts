import { useEffect } from 'react';

export function usePerformanceMonitoring() {
  useEffect(() => {
    // Monitor performance and log metrics
    const logPerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        // Log key metrics
        console.log('Performance Metrics:', {
          domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
          firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime,
          firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime,
          loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
        });
      }
    };

    // Report Core Web Vitals
    const reportWebVitals = () => {
      if ('PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // Silently handle unsupported browsers
        }

        // Monitor First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        });
        
        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          // Silently handle unsupported browsers
        }
      }
    };

    // Run performance monitoring
    if (document.readyState === 'complete') {
      logPerformance();
      reportWebVitals();
    } else {
      window.addEventListener('load', () => {
        logPerformance();
        reportWebVitals();
      });
    }
  }, []);
}