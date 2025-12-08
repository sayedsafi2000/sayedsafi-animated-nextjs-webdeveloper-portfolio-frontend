'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import { Mail, Send, Github, Linkedin, Facebook, Instagram, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }, [formData])

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sayedsafi2000', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sayed-safi/', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Facebook, href: 'https://www.facebook.com/sayedsafiii', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Instagram, href: 'https://www.instagram.com/sayedsafiii/', label: 'Instagram', color: 'hover:text-pink-600' },
  ]

  return (
        <section
          id="contact"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Let's Talk About Your Project
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a great idea? Reach out to me and let's make it happen together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Get In Touch
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-4">
              <motion.a
                href="mailto:sayedmdsafiuddin@gmail.com"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                whileHover={{ x: 5, scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors relative overflow-hidden"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(59, 130, 246, 0.4)',
                      '0 0 0 10px rgba(59, 130, 246, 0)',
                      '0 0 0 0 rgba(59, 130, 246, 0)',
                    ],
                  }}
                  transition={{
                    rotate: { duration: 0.5 },
                    scale: { duration: 0.5 },
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                    },
                  }}
                >
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 relative z-10" />
                </motion.div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Email
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    sayedmdsafiuddin@gmail.com
                  </div>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Location
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Boteshwor, Sylhet, Bangladesh
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <motion.div
                  className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg"
                  whileHover={{ rotate: [0, 360], scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Github className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </motion.div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    GitHub
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    57 Repositories · 26 Stars
                  </div>
                </div>
              </motion.div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Connect With Me
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group ${social.color}`}
                      whileHover={{ scale: 1.05, y: -5, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20, rotateX: -90 }}
                      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                      </motion.div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:font-semibold transition-all">
                        {social.label}
                      </span>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none"
                  placeholder="Your Message"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
                <motion.span
                  className="relative z-10 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <Send size={20} />
                  Send Message
                </motion.span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

