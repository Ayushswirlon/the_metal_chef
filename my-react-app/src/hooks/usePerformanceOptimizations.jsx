import { useEffect, useState } from "react";

export const usePerformanceOptimizations = () => {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);

    // Check for mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();

    // Check for low power mode (basic check)
    const checkPowerMode = () => {
      setIsLowPowerMode(
        navigator.getBattery &&
          navigator.getBattery().then((battery) => battery.level <= 0.2)
      );
    };
    checkPowerMode();

    // Event listeners
    window.addEventListener("resize", checkMobile);
    motionQuery.addEventListener("change", (e) =>
      setIsReducedMotion(e.matches)
    );

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", (e) =>
        setIsReducedMotion(e.matches)
      );
    };
  }, []);

  return {
    isLowPowerMode,
    isReducedMotion,
    isMobile,
    shouldReduceMotion: isLowPowerMode || isReducedMotion || isMobile,
  };
};
