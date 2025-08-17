import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  isLandscape: boolean;
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  browserSupport: {
    webgl: boolean;
    intersectionObserver: boolean;
    css3: boolean;
    flexbox: boolean;
    grid: boolean;
  };
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    isLandscape: false,
    screenSize: 'lg',
    browserSupport: {
      webgl: false,
      intersectionObserver: false,
      css3: false,
      flexbox: false,
      grid: false,
    },
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Device detection
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) || width < 768;
      const isTablet = (width >= 768 && width < 1024) || (/ipad|tablet|playbook|silk/i.test(userAgent) && width >= 768);
      const isDesktop = width >= 1024 && !isMobile && !isTablet;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isLandscape = width > height;

      // Screen size detection
      let screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'lg';
      if (width < 480) screenSize = 'xs';
      else if (width < 768) screenSize = 'sm';
      else if (width < 1024) screenSize = 'md';
      else if (width < 1280) screenSize = 'lg';
      else screenSize = 'xl';

      // Browser feature detection
      const browserSupport = {
        webgl: (() => {
          try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
          } catch {
            return false;
          }
        })(),
        intersectionObserver: 'IntersectionObserver' in window,
        css3: CSS.supports('transform', 'translateX(0)'),
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid'),
      };

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isTouchDevice,
        isLandscape,
        screenSize,
        browserSupport,
      });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
}