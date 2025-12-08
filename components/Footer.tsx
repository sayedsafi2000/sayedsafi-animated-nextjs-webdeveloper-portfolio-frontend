'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Facebook, Instagram, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sayedsafi2000', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sayed-safi/', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/sayedsafiii', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/sayedsafiii/', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <motion.h3
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sayed Safi
            </motion.h3>
            <p className="text-sm text-gray-400 mb-4">
              Full-Stack Web Developer creating amazing digital experiences. 
              MERN Stack specialist from Bangladesh.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <MapPin size={16} />
              <span>Boteshwor, Sylhet, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Mail size={16} />
              <a href="mailto:sayedmdsafiuddin@gmail.com" className="hover:text-blue-400 transition-colors">
                sayedmdsafiuddin@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  MERN Stack
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  WordPress
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Graphic Design
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  E-commerce Solutions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.1, y: -3, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                  >
                    <Icon className="w-5 h-5 text-gray-300" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        <motion.div
          className="border-t border-gray-800 pt-8 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <motion.p
            className="text-gray-400"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            © {currentYear} Sayed Safi. All rights reserved. Designed & developed with{' '}
            <motion.span
              className="inline-block"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              ❤️
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}

