'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const ParticlesBackground = dynamic(() => import('./ParticlesBackground'), {
  ssr: false,
  loading: () => null,
})
// Removed GSAP for better performance

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  // Removed scroll transforms for better performance

  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  // Removed mouse tracking for better performance

  useEffect(() => {
    // Enhanced animations for hero content
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.style.opacity = '1'
          titleRef.current.style.visibility = 'visible'
          // Add animation class
          titleRef.current.style.animation = 'fadeInUp 0.8s ease-out'
        }
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = '1'
          subtitleRef.current.style.animation = 'fadeInUp 0.8s ease-out 0.2s both'
        }
        if (textRef.current) {
          textRef.current.style.opacity = '1'
          textRef.current.style.animation = 'fadeInUp 0.8s ease-out 0.4s both'
        }
        if (buttonsRef.current) {
          Array.from(buttonsRef.current.children).forEach((child, index) => {
            (child as HTMLElement).style.animation = `fadeInUp 0.6s ease-out ${0.6 + index * 0.1}s both`
          })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [])

  // Removed variants for better performance

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-24"
    >
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] z-0"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] z-0"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[100px] z-0"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 z-[1]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-last lg:order-first">
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="text-sm md:text-base font-semibold text-blue-400 dark:text-blue-300 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20"
                whileHover={{ scale: 1.05 }}
              >
                👋 Hey, my name is
              </motion.span>
            </motion.div>

            <motion.h1
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight relative z-20"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block relative z-20"
                style={{
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                Sayed Safi
              </motion.span>
            </motion.h1>

            <motion.h2
              ref={subtitleRef}
              className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-gray-200 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Full-Stack
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Web Developer
              </motion.span>
            </motion.h2>
            
            <motion.p
              ref={textRef}
              className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              MERN Stack Expert · Based in Sylhet, Bangladesh
            </motion.p>

        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mb-8 leading-relaxed">
          Transforming concepts into seamless user experiences with modern web technologies. 
          Expert in MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, and WordPress. 
          Building scalable web applications and e-commerce solutions from Sylhet, Bangladesh.
        </p>

            <motion.div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.span
                  className="relative z-10 flex items-center gap-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  View My Work
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </motion.span>
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ scale: 1.05, y: -2, borderColor: 'rgb(59, 130, 246)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social Stats - Animated */}
            <motion.div
              className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {[
                { label: 'Projects', value: '50+', icon: '💼' },
                { label: 'Experience', value: '5+ Years', icon: '🚀' },
                { label: 'Repositories', value: '57+', icon: '📦' },
                { label: 'GitHub Stars', value: '26+', icon: '⭐' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 1.2 + index * 0.15,
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="text-2xl mb-2"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: 'easeInOut',
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.15 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hero Image - Animated */}
          <motion.div
            className="relative block order-first lg:order-last"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              {/* Animated Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Image Container */}
              <motion.div
                className="relative z-10 rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden">
                  <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src="/sayed_safi2.jpg"
                      alt="Sayed Safi - Full-Stack Web Developer"
                      fill
                      className="object-cover"
                      style={{ 
                        objectPosition: 'center center',
                      }}
                      priority
                      sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, 500px"
                    />
                  </motion.div>
                  {/* Subtle Border Glow */}
                  <motion.div
                    className="absolute inset-0 border-2 border-white/5 dark:border-gray-900/5 rounded-xl md:rounded-2xl pointer-events-none"
                  />
                </div>
              </motion.div>

              {/* Floating decorative elements - Hidden on mobile for better performance */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg opacity-20 blur-xl hidden sm:block"
                  style={{
                    top: `${20 + i * 30}%`,
                    left: i % 2 === 0 ? '-10%' : '110%',
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Animated */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 group"
            whileHover={{ scale: 1.2 }}
          >
            <motion.span
              className="text-sm font-medium"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Scroll
            </motion.span>
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ArrowDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </motion.div>
            <motion.div
              className="w-1 h-8 bg-gradient-to-b from-blue-600 to-transparent rounded-full mt-2"
              animate={{
                scaleY: [0.5, 1, 0.5],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
