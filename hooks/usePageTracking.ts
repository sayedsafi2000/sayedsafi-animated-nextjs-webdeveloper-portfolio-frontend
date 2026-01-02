/**
 * Hook to automatically track page visits
 * Use in layout or page components
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisit } from '@/lib/tracking';

export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Get page name from pathname
    const page = pathname === '/' ? 'home' : pathname.split('/').filter(Boolean).join('_') || 'home';
    
    // Track the visit
    trackVisit(page, pathname);
  }, [pathname]);
}

