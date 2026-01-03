'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import StructuredData from '@/components/StructuredData'
import ScrollProgress from '@/components/ScrollProgress'
import SmoothScroll from '@/components/SmoothScroll'
import LoadingScreen from '@/components/LoadingScreen'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import FloatingElements from '@/components/FloatingElements'

export default function AboutPage() {
  const pathname = usePathname()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    // Only show loading on initial page load, not on client-side navigation
    if (typeof window !== 'undefined') {
      const hasVisited = sessionStorage.getItem('hasVisited')
      if (hasVisited) {
        setIsInitialLoad(false)
        return
      }
      sessionStorage.setItem('hasVisited', 'true')
      
      const timer = setTimeout(() => {
        setIsInitialLoad(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {isInitialLoad && <LoadingScreen />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{ willChange: 'opacity' }}
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 relative"
      >
        <StructuredData />
        <ScrollProgress />
        <SmoothScroll />
        <FloatingElements />
        <Header />
        <About />
        <Experience />
        <Footer />
      </motion.main>
    </>
  )
}

