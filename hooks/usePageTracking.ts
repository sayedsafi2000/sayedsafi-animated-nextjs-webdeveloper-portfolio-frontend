/**
 * Hook to automatically track page visits
 * Use in layout or page components
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisit } from '@/lib/tracking';

export function usePageTracking() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!pathname) return;

    // Skip if already tracked for this path
    if (lastTrackedPath.current === pathname) return;

    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce tracking to avoid rapid calls
    timeoutRef.current = setTimeout(() => {
      // Get page name from pathname
      const page = pathname === '/' ? 'home' : pathname.split('/').filter(Boolean).join('_') || 'home';
      
      // Track the visit
      trackVisit(page, pathname);
      lastTrackedPath.current = pathname;
    }, 500); // 500ms debounce

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname]);
}

