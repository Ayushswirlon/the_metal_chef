export const measurePerformance = (componentName) => {
  const start = performance.now();

  return () => {
    const end = performance.now();
    const duration = end - start;

    if (duration > 16.67) {
      // Longer than one frame (60fps)
      console.warn(`${componentName} took ${duration.toFixed(2)}ms to render`);
    }
  };
};
