'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { adsAPI } from '@/lib/api'

interface Ad {
  _id: string
  title: string
  description?: string
  image: string
  link: string
  priority: number
  createdAt?: string
}

export default function AdDisplay() {
  const [ads, setAds] = useState<Ad[]>([])
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await adsAPI.getAll({ active: true, limit: 100 })
        const activeAds = response.data?.ads || []
        // Sort by priority (highest first), then by creation date (newest first for sidebar)
        const sortedAds = activeAds.sort((a: any, b: any) => {
          if (b.priority !== a.priority) {
            return b.priority - a.priority
          }
          // For sidebar, show newest first
          const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return bDate - aDate
        })
        
        // Get latest 3 ads for sidebar slider
        const latestAds = sortedAds.slice(0, 3)
        setAds(latestAds)
        
        // Track impression for first ad
        if (latestAds.length > 0) {
          adsAPI.trackImpression(latestAds[0]._id).catch(console.error)
        }
      } catch (error) {
        console.error('Error fetching ads:', error)
      }
    }

    fetchAds()
    
    // Refresh ads every 5 minutes
    const interval = setInterval(fetchAds, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Rotate ads every 1 minute (60000ms)
  useEffect(() => {
    if (ads.length <= 1) return

    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => {
        const nextIndex = (prev + 1) % ads.length
        // Track impression for new ad
        if (ads[nextIndex]) {
          adsAPI.trackImpression(ads[nextIndex]._id).catch(console.error)
        }
        return nextIndex
      })
    }, 60000) // 1 minute

    return () => clearInterval(interval)
  }, [ads])

  const handleAdClick = async (ad: Ad) => {
    try {
      await adsAPI.trackClick(ad._id)
      window.open(ad.link, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Error tracking click:', error)
      window.open(ad.link, '_blank', 'noopener,noreferrer')
    }
  }

  if (!isVisible || ads.length === 0) return null

  const currentAd = ads[currentAdIndex]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Advertisement</h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAd._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <button
            onClick={() => handleAdClick(currentAd)}
            className="block w-full group"
            aria-label={`Ad: ${currentAd.title}`}
          >
            <div className="relative w-full aspect-[4/5] bg-gray-100 dark:bg-gray-700 overflow-hidden">
              {currentAd.image ? (
                <Image
                  src={currentAd.image}
                  alt={currentAd.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 320px) 100vw, 320px"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-center px-4">{currentAd.title}</span>
                </div>
              )}
            </div>
            
            <div className="p-3">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {currentAd.title}
              </h4>
              {currentAd.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {currentAd.description}
                </p>
              )}
            </div>
          </button>

          {/* Slider indicator dots */}
          {ads.length > 1 && (
            <div className="flex justify-center gap-1.5 p-2 bg-gray-50 dark:bg-gray-900/50">
              {ads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentAdIndex(index)
                    adsAPI.trackImpression(ads[index]._id).catch(console.error)
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentAdIndex
                      ? 'w-6 bg-blue-600 dark:bg-blue-400'
                      : 'w-1.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to ad ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
