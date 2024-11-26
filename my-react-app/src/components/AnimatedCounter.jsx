import React, { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useSpring, useTransform } from "framer-motion";

const AnimatedCounter = React.memo(({ value, duration = 2, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
    rootMargin: "50px",
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Memoize numeric calculations
  const { numericValue, hasDecimal, decimalPlaces } = useMemo(() => {
    const num = parseInt(value.replace(/[^0-9.]/g, ""));
    const hasDecimal = value.includes(".");
    const decimalPlaces = hasDecimal ? value.split(".")[1].length : 0;
    return { numericValue: num, hasDecimal, decimalPlaces };
  }, [value]);

  // Optimize spring configuration
  const spring = useSpring(0, {
    duration: duration * 1000,
    delay: delay * 1000,
    stiffness: 30,
    damping: 20,
  });

  useEffect(() => {
    if (inView && !isAnimating) {
      setIsAnimating(true);
      spring.set(numericValue);
    }
  }, [inView, isAnimating, spring, numericValue]);

  const displayed = useTransform(spring, (latest) =>
    hasDecimal ? latest.toFixed(decimalPlaces) : Math.round(latest).toString()
  );

  return (
    <motion.div ref={ref} className="inline-flex items-center justify-center">
      <motion.span className="tabular-nums">{displayed}</motion.span>
    </motion.div>
  );
});

export default AnimatedCounter;
