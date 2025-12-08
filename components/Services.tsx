'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Globe, Palette } from 'lucide-react'

const services = [
  {
    icon: Code,
    title: 'MERN Stack',
    description: 'Full-stack development using MongoDB, Express, React, and Node.js to build scalable and modern web applications.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Globe,
    title: 'WordPress',
    description: 'Custom WordPress development, theme customization, and plugin development for dynamic and content-rich websites.',
    color: 'from-blue-600 to-blue-400',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Creative graphic design services including UI/UX design, branding, and visual identity for your digital presence.',
    color: 'from-purple-500 to-pink-500',
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 md:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            My Services
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            What I can do for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, rotateY: -90, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, rotateY: 0, scale: 1 } : {}}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  y: -15,
                  rotateY: 8,
                  rotateX: 5,
                  scale: 1.05,
                  z: 50,
                }}
                className="group relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden perspective-1000"
              >
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 group-hover:opacity-30 transition-opacity"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
                <motion.div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 relative`}
                  whileHover={{ 
                    rotate: 360, 
                    scale: 1.15,
                    y: -5
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 200,
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <Icon className="w-8 h-8 text-white relative z-10" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

