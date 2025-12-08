'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Enhanced floating shapes with more variety
  const shapes = [
    { size: 80, x: 10, y: 20, duration: 20, delay: 0, color: 'blue' },
    { size: 100, x: 80, y: 40, duration: 25, delay: 5, color: 'purple' },
    { size: 70, x: 50, y: 70, duration: 22, delay: 2, color: 'pink' },
    { size: 90, x: 20, y: 10, duration: 28, delay: 7, color: 'cyan' },
  ]

  if (!mounted) {
    // Return empty div with same structure to prevent hydration mismatch
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" suppressHydrationWarning />
    )
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, index) => {
        const colorMap: Record<string, string> = {
          blue: 'rgba(59, 130, 246, 0.2)',
          purple: 'rgba(139, 92, 246, 0.2)',
          pink: 'rgba(236, 72, 153, 0.2)',
        }
        const colorMap2: Record<string, string> = {
          blue: 'rgba(139, 92, 246, 0.2)',
          purple: 'rgba(236, 72, 153, 0.2)',
          pink: 'rgba(59, 130, 246, 0.2)',
        }
        
        return (
          <motion.div
            key={index}
            className="absolute rounded-full opacity-20 blur-2xl"
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              background: `radial-gradient(circle, ${colorMap[shape.color]}, ${colorMap2[shape.color]})`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              x: [0, 30, 0],
              y: [0, -30, 0],
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

