'use client'

import { usePageTracking } from '@/hooks/usePageTracking'

/**
 * Client component to track page visits
 * Must be used in a client component context
 */
export default function PageTracker() {
  usePageTracking()
  return null
}

