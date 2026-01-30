'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { adsAPI } from '@/lib/api'
import { X } from 'lucide-react'

interface Ad {
  _id: string
  title: string
  description?: string
  image: string
  link: string
  priority: number
  createdAt?: string
}

interface AdPopupItemProps {
  ad: Ad
  onClose: () => void
  onNext: () => void
}

function AdPopupItem({ ad, onClose, onNext }: AdPopupItemProps) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Track impression when popup appears
    adsAPI.trackImpression(ad._id).catch(console.error)

    // Auto-close after 10 seconds
    const timer = setTimeout(() => {
      setIsClosing(true)
      setTimeout(() => {
        onNext()
      }, 300) // Wait for exit animation
    }, 10000)

    return () => clearTimeout(timer)
  }, [ad._id, onNext])

  const handleAdClick = async () => {
    try {
      await adsAPI.trackClick(ad._id)
      window.open(ad.link, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Error tracking click:', error)
      window.open(ad.link, '_blank', 'noopener,noreferrer')
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onNext()
    }, 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 400, scale: 0.95 }}
      animate={{ 
        opacity: isClosing ? 0 : 1, 
        x: isClosing ? 400 : 0, 
        scale: isClosing ? 0.95 : 1 
      }}
      exit={{ opacity: 0, x: 400, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-20 right-4 z-[9999] w-[320px] max-w-[calc(100%-2rem)] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-2 border-gray-300 dark:border-gray-600 overflow-hidden backdrop-blur-sm"
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-1.5 right-1.5 z-10 p-0.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        aria-label="Close ad"
      >
        <X size={12} />
      </button>

      {/* Ad badge */}
      <div className="absolute top-1.5 left-1.5 px-1 py-0.5 bg-blue-600 text-white text-[10px] font-semibold rounded z-10">
        Ad
      </div>

      {/* Ad Content - Horizontal Layout */}
      <button
        onClick={handleAdClick}
        className="block w-full group"
        aria-label={`Ad: ${ad.title}`}
      >
        <div className="flex min-h-[150px]">
          {/* Left Side - Image */}
          <div className="relative w-28 flex-shrink-0 bg-gray-100 dark:bg-gray-700 overflow-hidden">
            {ad.image ? (
              <Image
                src={ad.image}
                alt={ad.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="112px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-xs text-center px-2">{ad.title}</span>
              </div>
            )}
          </div>
          
          {/* Right Side - Title & Description */}
          <div className="flex-1 p-2.5 flex flex-col justify-between min-w-0">
            <div>
              <h4 className="font-semibold text-xs text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {ad.title}
              </h4>
              {ad.description && (
                <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                  {ad.description}
                </p>
              )}
            </div>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 mt-1.5 inline-block group-hover:underline">
              Learn More →
            </span>
          </div>
        </div>
      </button>

      {/* Progress bar (10 seconds) */}
      <div className="h-1 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 10, ease: 'linear' }}
        />
      </div>
    </motion.div>
  )
}

interface AdPopupManagerProps {
  ads: Ad[]
}

export default function AdPopupManager({ ads }: AdPopupManagerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (ads.length === 0) {
      setIsVisible(false)
      return
    }

    // Reset to first ad when ads change
    setCurrentIndex(0)
    
    // Show first popup after 2 seconds delay
    const delayTimer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(delayTimer)
  }, [ads])

  const handleNext = () => {
    if (currentIndex < ads.length - 1) {
      // Move to next ad after a short delay
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
      }, 400) // Small delay between popups
    } else {
      // No more ads
      setIsVisible(false)
    }
  }

  if (!isVisible || ads.length === 0 || currentIndex >= ads.length) {
    return null
  }

  return (
    <AnimatePresence mode="wait" onExitComplete={handleNext}>
      {isVisible && (
        <AdPopupItem
          key={`${ads[currentIndex]._id}-${currentIndex}`}
          ad={ads[currentIndex]}
          onClose={handleNext}
          onNext={handleNext}
        />
      )}
    </AnimatePresence>
  )
}
