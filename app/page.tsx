'use client'

import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import StructuredData from '@/components/StructuredData'
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
const ScrollProgress = lazy(() => import('@/components/ScrollProgress'))
const SmoothScroll = lazy(() => import('@/components/SmoothScroll'))

export default function Home() {
  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
        }}
        style={{ willChange: 'opacity' }}
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 relative"
        role="main"
      >
        <StructuredData />
        <Suspense fallback={null}>
          <ScrollProgress />
        </Suspense>
        <Suspense fallback={null}>
          <SmoothScroll />
        </Suspense>
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
