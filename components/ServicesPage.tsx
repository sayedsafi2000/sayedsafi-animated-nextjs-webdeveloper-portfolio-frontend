'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, Globe, Palette, ArrowLeft, Check } from 'lucide-react'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    icon: Code,
    title: 'MERN Stack Development',
    description: 'Full-stack development using MongoDB, Express, React, and Node.js to build scalable and modern web applications.',
    features: [
      'RESTful API Development',
      'Real-time Applications',
      'Database Design & Optimization',
      'Authentication & Authorization',
      'Cloud Deployment',
      'Performance Optimization',
    ],
    color: 'from-blue-500 to-cyan-500',
    price: 'Custom',
  },
  {
    icon: Globe,
    title: 'WordPress Development',
    description: 'Custom WordPress development, theme customization, and plugin development for dynamic and content-rich websites.',
    features: [
      'Custom Theme Development',
      'Plugin Development',
      'WooCommerce Integration',
      'Performance Optimization',
      'Security Hardening',
      'Migration & Maintenance',
    ],
    color: 'from-blue-600 to-blue-400',
    price: 'Custom',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Creative graphic design services including UI/UX design, branding, and visual identity for your digital presence.',
    features: [
      'UI/UX Design',
      'Brand Identity',
      'Logo Design',
      'Web Graphics',
      'Social Media Graphics',
      'Print Design',
    ],
    color: 'from-purple-500 to-pink-500',
    price: 'Custom',
  },
]

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }
    )

    const cards = containerRef.current.querySelectorAll('.service-card')
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 100,
        rotateY: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>

        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          My Services
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-12">
          Professional web development services tailored to your needs
        </p>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="service-card group relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity rounded-bl-full`} />
                
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.price}
                  </div>
                  <Link
                    href="/#contact"
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

