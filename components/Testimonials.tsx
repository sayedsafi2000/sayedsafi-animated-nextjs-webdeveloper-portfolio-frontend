'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Ahmed Rahman',
    role: 'CEO, CBECBD',
    content: 'Working with Sayed Safi on our multivendor e-commerce platform was exceptional. His deep understanding of MERN stack and ability to handle complex features like payment integration and vendor management made our project a huge success. Highly professional and reliable!',
    rating: 5,
    image: '/api/placeholder/100/100',
  },
  {
    name: 'Fatima Khan',
    role: 'Director, Webcoronet IT',
    content: 'Sayed worked with us as a Full Stack Developer and delivered outstanding results. His technical expertise in React, Node.js, and MongoDB helped us complete multiple client projects successfully. He\'s a valuable asset to any development team.',
    rating: 5,
    image: '/api/placeholder/100/100',
  },
  {
    name: 'Mohammad Ali',
    role: 'Founder, GOBangla Academy',
    content: 'The educational platform Sayed built for us exceeded all expectations. It\'s fast, responsive, and beautifully designed with excellent user experience. His communication throughout the project was excellent, and he always delivered on time.',
    rating: 5,
    image: '/api/placeholder/100/100',
  },
]

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
        <section
          id="testimonials"
          ref={ref}
          className="py-20 md:py-32 pt-24 md:pt-28 relative overflow-hidden"
        >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
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
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block text-sm text-blue-600 dark:text-blue-400 font-semibold px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            💬 Client Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            What Clients Say
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take my word for it - hear from clients who've worked with me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateY: -90, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0, scale: 1 } : {}}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8,
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                y: -15,
                rotateY: 8,
                rotateX: 5,
                scale: 1.03,
                z: 50,
              }}
              className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all perspective-1000 group"
            >
              {/* Quote Icon */}
              <motion.div
                className="absolute top-4 right-4 text-blue-500/20 group-hover:text-blue-500/40 transition-colors"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: index * 0.5,
                  ease: 'easeInOut'
                }}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2
                }}
              >
                <Quote size={60} />
              </motion.div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-500"
              />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.2 + i * 0.1 }}
                  >
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-6 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {testimonial.name.charAt(0)}
                </motion.div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                whileHover={{ opacity: 0.1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

