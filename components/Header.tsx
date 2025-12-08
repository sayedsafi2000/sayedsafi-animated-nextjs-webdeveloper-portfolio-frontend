'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Experience', href: '/experience' },
  { name: 'Services', href: '/services' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    let rafId: number
    let lastTime = 0
    const throttleDelay = 16 // ~60fps

    const handleScroll = () => {
      const now = Date.now()
      if (now - lastTime < throttleDelay) return
      lastTime = now

      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20)
      })
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 w-screen max-w-full overflow-x-hidden ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-gray-800/50'
          : 'bg-transparent'
      }`}
    >
      {/* Animated background gradient when scrolled */}
      {isScrolled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"
          animate={{
            backgroundPosition: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />
      )}
      <nav className="w-full max-w-full overflow-x-hidden">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 w-full max-w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 min-w-0 max-w-[calc(100%-100px)] sm:max-w-none"
          >
            <Link
              href="/"
              className="relative group flex items-center gap-1 sm:gap-1.5 md:gap-2 min-w-0"
            >
              {/* Logo/Icon */}
              <motion.div
                className="relative w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg flex-shrink-0"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-white text-xs sm:text-lg md:text-xl font-bold relative z-10">SS</span>
                <motion.div
                  className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-white/20"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
              
              {/* Site Title */}
              <div className="flex flex-col min-w-0 overflow-hidden">
                <motion.span
                  className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative z-10 truncate"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  Sayed Safi
                </motion.span>
                <motion.span
                  className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:block truncate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Full-Stack Developer
                </motion.span>
              </div>
              
              {/* Glow effect on hover */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 relative z-10 flex-shrink-0">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.08,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20
                }}
              >
                <Link
                  href={item.href}
                  className={`relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium group px-2 xl:px-3 py-2 rounded-lg xl:rounded-xl block text-sm xl:text-base ${
                    pathname === item.href ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                  }`}
                >
                  <motion.span
                    className="relative z-10 flex items-center gap-1"
                    whileHover={{ y: -2, scale: 1.05 }}
                  >
                    {item.name}
                  </motion.span>
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
                    initial={{ scaleX: pathname === item.href ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  {/* Background glow on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg xl:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                  />
                </Link>
              </motion.div>
            ))}
            <motion.div
              className="ml-2 xl:ml-4 pl-2 xl:pl-4 border-l border-gray-300 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative p-2 xl:p-2.5 rounded-lg xl:rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg transition-all group"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg xl:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
                {mounted && theme === 'dark' ? (
                  <Sun size={18} className="xl:w-5 xl:h-5 relative z-10" />
                ) : (
                  <Moon size={18} className="xl:w-5 xl:h-5 relative z-10" />
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Tablet & Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-1 sm:gap-1.5 md:gap-2 relative z-10 flex-shrink-0">
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200 shadow-md"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1, rotate: 180 }}
            >
              {mounted && theme === 'dark' ? <Sun size={14} className="sm:w-4 sm:h-4" /> : <Moon size={14} className="sm:w-4 sm:h-4" />}
            </motion.button>
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              {isMobileMenuOpen ? <X size={16} className="sm:w-5 sm:h-5" /> : <Menu size={16} className="sm:w-5 sm:h-5" />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden"
          >
            <div className="w-full px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 max-h-[80vh] overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 relative group text-sm sm:text-base ${
                      pathname === item.href ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-between gap-2">
                      <span>{item.name}</span>
                      <motion.span
                        className="text-xs opacity-60"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
                      >
                        →
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

