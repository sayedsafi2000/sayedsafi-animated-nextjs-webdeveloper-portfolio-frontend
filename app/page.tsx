'use client'

import { useEffect, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import StructuredData from '@/components/StructuredData'
import ScrollProgress from '@/components/ScrollProgress'
import SmoothScroll from '@/components/SmoothScroll'
import LoadingScreen from '@/components/LoadingScreen'
import { Metadata } from 'next'

// Lazy load heavy components
const About = lazy(() => import('@/components/About'))
const Projects = lazy(() => import('@/components/Projects'))
const Blog = lazy(() => import('@/components/Blog'))
const Experience = lazy(() => import('@/components/Experience'))
const Services = lazy(() => import('@/components/Services'))
const Testimonials = lazy(() => import('@/components/Testimonials'))
const CallToAction = lazy(() => import('@/components/CallToAction'))
const Contact = lazy(() => import('@/components/Contact'))
const Footer = lazy(() => import('@/components/Footer'))
const FloatingElements = lazy(() => import('@/components/FloatingElements'))

// Loading fallback
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
)

export default function Home() {
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
        role="main"
      >
        <StructuredData />
        <ScrollProgress />
        <SmoothScroll />
        <Suspense fallback={null}>
          <FloatingElements />
        </Suspense>
        <Header />
        
        {/* Hero Section with H1 */}
        <section aria-label="Hero introduction">
          <Hero />
        </section>
        
        {/* About Section */}
        <section id="about" aria-label="About me">
          <Suspense fallback={null}>
            <About />
          </Suspense>
        </section>
        
        {/* Projects Section */}
        <section id="projects" aria-label="Project portfolio">
          <Suspense fallback={null}>
            <Projects />
          </Suspense>
        </section>
        
        {/* Blog Section */}
        <section id="blog" aria-label="Blog articles">
          <Suspense fallback={null}>
            <Blog />
          </Suspense>
        </section>
        
        {/* Experience Section */}
        <section id="experience" aria-label="Work experience">
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </section>
        
        {/* Services Section */}
        <section id="services" aria-label="Web development services">
          <Suspense fallback={null}>
            <Services />
          </Suspense>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" aria-label="Client testimonials">
          <Suspense fallback={null}>
            <Testimonials />
          </Suspense>
        </section>
        
        {/* Call to Action Section */}
        <section aria-label="Call to action">
          <Suspense fallback={null}>
            <CallToAction />
          </Suspense>
        </section>
        
        {/* Contact Section */}
        <section id="contact" aria-label="Contact information">
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        </section>
        
        {/* Footer */}
        <footer>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </footer>
      </motion.main>
    </>
  )
}
