'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    // Enhanced smooth scroll with easing and performance optimization
    const smoothScroll = (e: Event) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      
      if (anchor) {
        e.preventDefault()
        const href = anchor.getAttribute('href')
        if (href && href !== '#') {
          // Use requestAnimationFrame for better performance
          requestAnimationFrame(() => {
            const element = document.querySelector(href)
            if (element) {
              const headerOffset = 80
              const elementPosition = element.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
              })
            }
          })
        }
      }
    }

    // Use passive listener for better scroll performance
    document.addEventListener('click', smoothScroll, { passive: false })
    return () => document.removeEventListener('click', smoothScroll)
  }, [])

  return null
}

