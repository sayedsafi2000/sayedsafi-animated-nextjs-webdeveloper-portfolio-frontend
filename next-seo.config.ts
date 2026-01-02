// SEO Configuration for Next.js
// Prevents CLS (Cumulative Layout Shift) from animations

export const pageTransitionConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
  // Important: Don't animate position/size to prevent CLS
}

export const sectionTransitionConfig = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.5 },
  viewport: { once: true, amount: 0.3 },
}

// Image optimization for LCP
export const heroImagePriority = {
  priority: true, // Load immediately for hero
  loading: 'eager',
  quality: 90,
}

export const defaultImageConfig = {
  priority: false, // Lazy load by default
  loading: 'lazy',
  quality: 85,
}

// Font optimization
export const fontOptimization = {
  preload: true,
  display: 'swap', // Prevent FOUT
  fallback: 'sans-serif',
}

// Script optimization
export const scriptOptimization = {
  strategy: 'lazyOnload' as const, // Load non-critical scripts after page interactive
}

// CSS optimization
export const criticalCSSPages = [
  '/', // Homepage
  '/blog',
  '/projects',
  '/services',
]

// Prefetch configuration
export const prefetchConfig = {
  enabled: true,
  delay: 1000, // Prefetch after 1 second of inactivity
}

