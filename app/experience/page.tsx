'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import StructuredData from '@/components/StructuredData'
import ScrollProgress from '@/components/ScrollProgress'
import SmoothScroll from '@/components/SmoothScroll'
import LoadingScreen from '@/components/LoadingScreen'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import FloatingElements from '@/components/FloatingElements'

export default function ExperiencePage() {
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
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
        <Experience />
        <Footer />
      </motion.main>
    </>
  )
}

