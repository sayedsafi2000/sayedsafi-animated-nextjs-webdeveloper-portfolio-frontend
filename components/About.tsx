'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const stats = [
  { label: 'Years of experience', value: '5+', icon: '🚀' },
  { label: 'Projects done', value: '50+', icon: '💼' },
  { label: 'Happy Clients', value: '30+', icon: '😊' },
]

const skills = [
  { name: 'React', percentage: 90, color: 'from-blue-500 to-cyan-500', icon: '⚛️' },
  { name: 'Next.js', percentage: 85, color: 'from-gray-800 to-gray-600', icon: '▲' },
  { name: 'Node.js', percentage: 88, color: 'from-green-500 to-emerald-500', icon: '🟢' },
  { name: 'MedusaJS', percentage: 80, color: 'from-purple-500 to-pink-500', icon: '🛒' },
  { name: 'MongoDB', percentage: 85, color: 'from-green-600 to-green-400', icon: '🍃' },
  { name: 'WordPress', percentage: 90, color: 'from-blue-600 to-blue-400', icon: '📝' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const statsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simplified - no heavy animations
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-card')
      statCards.forEach((card) => {
        (card as HTMLElement).style.opacity = '1'
      })
    }
    if (skillsRef.current) {
      const skillCards = skillsRef.current.querySelectorAll('.skill-card')
      skillCards.forEach((card) => {
        (card as HTMLElement).style.opacity = '1'
      })
    }
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-32 pt-24 md:pt-28 bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            About Sayed Safi
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Sayed Safi is a passionate MERN Stack Developer from Bangladesh, currently working at Asad Snapper on Musafir Store - an innovative e-commerce platform. 
            Studying Computer Science & Engineering at Metropolitan University, Sylhet. 
            Specializing in building modern web applications, e-commerce solutions, and responsive websites using Next.js, React, Node.js, MongoDB, and WordPress.
          </p>
        </motion.div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group perspective-1000"
              whileHover={{ 
                scale: 1.08, 
                y: -10, 
                rotateY: 5,
                rotateX: 5,
                z: 50
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"
              />
              <motion.div
                className="text-4xl mb-4 relative z-10"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: index * 0.3,
                  ease: 'easeInOut'
                }}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2
                }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 relative z-10"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ 
                  delay: index * 0.15 + 0.3, 
                  type: 'spring', 
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.1,
                  filter: 'brightness(1.2)',
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-600 dark:text-gray-400 font-medium relative z-10">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <motion.h3 
            className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            My Tech Stack
          </motion.h3>
          <div ref={skillsRef} className="flex flex-wrap justify-center gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card bg-white dark:bg-gray-900 px-6 py-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group"
                initial={{ opacity: 0, x: -150, scale: 0.5, rotate: -10 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1, rotate: 0 } : {}}
                transition={{
                  delay: 0.3 + index * 0.15,
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 150,
                  damping: 15,
                }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -8,
                  rotate: [0, -5, 5, 0],
                  zIndex: 50,
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                />
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    className="text-3xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: 'easeInOut',
                      delay: index * 0.2 
                    }}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2
                    }}
                  >
                    {skill.icon}
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 dark:text-white text-base md:text-lg">
                      {skill.name}
                    </span>
                    <motion.span
                      className="text-xs text-gray-500 dark:text-gray-400 font-medium"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {skill.percentage}% Expert
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

