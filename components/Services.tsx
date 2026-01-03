'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Code, Globe, Palette, Briefcase, Database, Smartphone, Cloud, TrendingUp, PenTool, FileText, Megaphone } from 'lucide-react'
import { servicesAPI } from '@/lib/api'

interface Service {
  _id: string
  title: string
  description: string
  icon: string
  color: string
  active: boolean
  image?: string
}

const iconMap: Record<string, any> = {
  Code: Code,
  Globe: Globe,
  Palette: Palette,
  Database: Database,
  Mobile: Smartphone,
  Smartphone: Smartphone,
  Cloud: Cloud,
  Briefcase: Briefcase,
  'Digital Marketing': Megaphone,
  'Content Writing': PenTool,
  Marketing: Megaphone,
  Writing: PenTool,
  Content: FileText,
  Megaphone: Megaphone,
  PenTool: PenTool,
  FileText: FileText,
  TrendingUp: TrendingUp,
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        // Fetch services - backend sorts by order first, then createdAt
        // So we fetch more and sort by createdAt on frontend to get truly latest
        const response = await servicesAPI.getAll({ limit: 20, active: true })
        let allServices = response?.data?.services || []
        
        // Sort by createdAt (newest first) to get the latest services
        allServices = allServices.sort((a: any, b: any) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA // Newest first
        })
        
        // Get the latest 6 services
        const latestServices = allServices.slice(0, 6)
        
        setServices(latestServices)
      } catch (error) {
        console.error('Error fetching services:', error)
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <section
        id="services"
        ref={ref}
        className="py-20 md:py-32"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 md:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            My Services
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            What I can do for you
          </p>
        </motion.div>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No services available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              // Try to find icon by service title first, then by icon name
              const Icon = iconMap[service.title] || iconMap[service.icon] || Code
              const hasImage = service.image && service.image.trim() !== ''
              
              return (
                <motion.div
                  key={service._id}
                  style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: 'tween'
                  }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { 
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  }}
                  className="group relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity rounded-bl-full`} />
                  
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {hasImage ? (
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-8 h-8 object-contain"
                        style={{ filter: 'brightness(0) invert(1)' }}
                        onError={(e) => {
                          // Fallback to icon if image fails
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const iconElement = target.nextElementSibling as HTMLElement
                          if (iconElement) iconElement.style.display = 'block'
                        }}
                      />
                    ) : null}
                    <Icon 
                      className={`w-8 h-8 text-white ${hasImage ? 'hidden' : ''}`}
                      style={{ display: hasImage ? 'none' : 'block' }}
                    />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
