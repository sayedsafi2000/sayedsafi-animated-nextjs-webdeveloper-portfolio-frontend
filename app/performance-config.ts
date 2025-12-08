// Performance configuration
export const performanceConfig = {
  // Reduce animation complexity on low-end devices
  reduceMotion: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // Throttle intervals
  mouseThrottle: 32, // ~30fps
  scrollThrottle: 16, // ~60fps
  
  // Particle settings
  particles: {
    count: 30,
    fpsLimit: 60,
  },
  
  // Animation settings
  animations: {
    duration: 0.6,
    stagger: 0.1,
  },
}

