'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Particles from '@tsparticles/react'
import { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Container, Engine } from '@tsparticles/engine'

export default function ParticlesBackground() {
  const [init, setInit] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
      
      // Disable particles on mobile for better performance
      if (isMobileDevice) {
        return
      }

      initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine)
      }).then(() => {
        setInit(true)
      })
    }

    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Particles loaded
  }, [])

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 30, // Reduced from 60 for better performance
      interactivity: {
        events: {
          onClick: {
            enable: false, // Disabled for performance
            mode: 'push' as const,
          },
          onHover: {
            enable: true,
            mode: 'grab' as const,
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          push: {
            quantity: 2, // Reduced from 4
          },
          grab: {
            distance: 150, // Reduced from 200
            links: {
              opacity: 0.3, // Reduced from 0.5
            },
          },
          repulse: {
            distance: 100, // Reduced from 150
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b'],
        },
        links: {
          color: '#3b82f6',
          distance: 120, // Reduced from 150
          enable: true,
          opacity: 0.3, // Reduced from 0.4
          width: 1,
        },
        move: {
          direction: 'none' as const,
          enable: true,
          outModes: {
            default: 'bounce' as const,
          },
          random: true,
          speed: 0.8, // Reduced from 1
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 1000, // Increased area to reduce density
          },
          value: 40, // Reduced from 80 for better performance
        },
        opacity: {
          value: { min: 0.2, max: 0.6 }, // Reduced opacity range
          animation: {
            enable: true,
            speed: 0.5, // Reduced from 1
            sync: false,
          },
        },
        shape: {
          type: 'circle' as const,
        },
        size: {
          value: { min: 1, max: 3 }, // Reduced max size from 4
          animation: {
            enable: true,
            speed: 1, // Reduced from 2
            sync: false,
          },
        },
      },
      detectRetina: false, // Disabled for better performance
    }),
    []
  )

  // Don't render particles on mobile
  if (isMobile || !init) return null

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      className="absolute inset-0 z-0"
      style={{ willChange: 'transform' }}
    />
  )
}

