import { useState, useEffect } from 'react';
import React from 'react';

/**
 * Custom hook to prevent hydration mismatches with animations
 * Returns a boolean that's false on server-side and true after client hydration
 * 
 * Usage:
 * const mounted = useIsHydrated();
 * 
 * <motion.div
 *   initial={mounted ? { opacity: 0 } : false}
 *   animate={mounted ? { opacity: 1 } : false}
 * >
 */
export function useIsHydrated() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

/**
 * Higher-order component wrapper for hydration-safe animations
 * Prevents motion components from animating during SSR
 */
export function withHydrationSafeAnimation<T extends object>(
  Component: React.ComponentType<T>
) {
  return function HydrationSafeComponent(props: T) {
    const mounted = useIsHydrated();
    
    if (!mounted) {
      // Return a static version without animations during SSR
      return React.createElement('div', { suppressHydrationWarning: true }, null);
    }
    
    return React.createElement(Component, props);
  };
}

/**
 * Animation variants that are hydration-safe
 * Use these with the useIsHydrated hook
 */
export const hydrationSafeVariants = {
  fadeIn: (mounted: boolean) => ({
    initial: mounted ? { opacity: 0 } : false,
    animate: mounted ? { opacity: 1 } : false,
    transition: { duration: 0.6 }
  }),
  
  slideUp: (mounted: boolean) => ({
    initial: mounted ? { opacity: 0, y: 20 } : false,
    animate: mounted ? { opacity: 1, y: 0 } : false,
    transition: { duration: 0.6 }
  }),
  
  scaleIn: (mounted: boolean) => ({
    initial: mounted ? { opacity: 0, scale: 0.95 } : false,
    animate: mounted ? { opacity: 1, scale: 1 } : false,
    transition: { duration: 0.6 }
  }),
  
  staggeredFadeIn: (mounted: boolean, delay: number = 0) => ({
    initial: mounted ? { opacity: 0, y: 10 } : false,
    animate: mounted ? { opacity: 1, y: 0 } : false,
    transition: { duration: 0.6, delay }
  })
};