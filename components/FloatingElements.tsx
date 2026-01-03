'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Detect mobile devices
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Reduced shapes and simplified animations for better performance
  const shapes = useMemo(() => [
    { size: 60, x: 10, y: 20, duration: 25, delay: 0, color: 'blue' },
    { size: 70, x: 80, y: 40, duration: 30, delay: 5, color: 'purple' },
  ], [])

  if (!mounted) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" suppressHydrationWarning />
    )
  }

  // Disable on mobile for better performance
  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" />
    )
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, index) => {
        const colorMap: Record<string, string> = {
          blue: 'rgba(59, 130, 246, 0.15)', // Reduced opacity
          purple: 'rgba(139, 92, 246, 0.15)',
          pink: 'rgba(236, 72, 153, 0.15)',
        }
        const colorMap2: Record<string, string> = {
          blue: 'rgba(139, 92, 246, 0.15)',
          purple: 'rgba(236, 72, 153, 0.15)',
          pink: 'rgba(59, 130, 246, 0.15)',
        }
        
        return (
          <motion.div
            key={index}
            className="absolute rounded-full opacity-15 blur-xl" // Reduced blur from blur-2xl
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              background: `radial-gradient(circle, ${colorMap[shape.color]}, ${colorMap2[shape.color]})`,
              willChange: 'transform', // Performance hint
            }}
            animate={{
              scale: [1, 1.2, 1], // Reduced scale from 1.3
              rotate: [0, 180, 360],
              x: [0, 20, 0], // Reduced movement from 30
              y: [0, -20, 0],
            }}
            transition={{
              scale: {
                duration: shape.duration / 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: shape.duration * 2,
                repeat: Infinity,
                ease: 'linear',
              },
              x: {
                duration: shape.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: shape.delay,
              },
              y: {
                duration: shape.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: shape.delay,
              },
            }}
          />
        )
      })}
    </div>
  )
}

