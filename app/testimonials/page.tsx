'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import StructuredData from '@/components/StructuredData'
import ScrollProgress from '@/components/ScrollProgress'
import SmoothScroll from '@/components/SmoothScroll'
import LoadingScreen from '@/components/LoadingScreen'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import FloatingElements from '@/components/FloatingElements'

export default function TestimonialsPage() {
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
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 relative"
      >
        <StructuredData />
        <ScrollProgress />
        <SmoothScroll />
        <FloatingElements />
        <Header />
        <Testimonials />
        <Footer />
      </motion.main>
    </>
  )
}

