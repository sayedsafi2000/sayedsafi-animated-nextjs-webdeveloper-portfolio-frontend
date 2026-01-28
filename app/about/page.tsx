'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
        
        {/* Page Header */}
        <section className="py-12 pt-24 md:pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </Link>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
              About Me
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-12">
              Learn more about my background, skills, and journey in web development
            </p>
          </div>
        </section>

        <About />
        <Experience />
        <Footer />
      </motion.main>
    </>
  )
}

