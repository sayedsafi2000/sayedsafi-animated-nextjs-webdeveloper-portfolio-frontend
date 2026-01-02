/**
 * Frontend tracking utilities
 * Privacy-friendly: no cookies, no localStorage
 * Respects Do Not Track header
 */

// Generate a session ID (stored in memory only, not persisted)
let sessionId: string | null = null;

/**
 * Generate or retrieve session ID
 * Session ID is based on current date, so it resets daily
 */
function getSessionId(): string {
  if (!sessionId) {
    // Generate a simple session ID based on date + random
    // This is privacy-friendly and resets daily
    const date = new Date().toISOString().split('T')[0];
    const random = Math.random().toString(36).substring(2, 15);
    sessionId = `${date}-${random}`;
  }
  return sessionId;
}

/**
 * Check if Do Not Track is enabled
 */
function hasDoNotTrack(): boolean {
  if (typeof navigator !== 'undefined') {
    return navigator.doNotTrack === '1' || 
           (navigator as any).msDoNotTrack === '1' ||
           (window as any).doNotTrack === '1';
  }
  return false;
}

/**
 * Get API URL for tracking
 * Uses relative URLs to call Next.js API routes (which proxy to backend)
 * This keeps the backend URL hidden from the client
 */
function getTrackingAPIUrl(): string {
  // Always use relative URL - Next.js API route will proxy to backend
  return '/api/track';
}

/**
 * Track a page visit
 */
export async function trackVisit(page: string, path: string) {
  // Respect Do Not Track
  if (hasDoNotTrack()) {
    console.log('📊 Tracking skipped: Do Not Track enabled');
    return;
  }

  try {
    const referrer = typeof document !== 'undefined' ? document.referrer : '';
    const apiUrl = getTrackingAPIUrl();
    
    // Don't log API URL in production to keep it hidden
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Tracking visit:', { page, path });
    }
    
    const response = await fetch(`${apiUrl}/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
        path,
        referrer,
        sessionId: getSessionId()
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Visit tracked successfully');
      // Update session ID if provided by server
      if (data.data?.sessionId) {
        sessionId = data.data.sessionId;
      }
    } else {
      console.warn('⚠️ Tracking failed:', response.status, response.statusText);
      if (response.status === 404) {
        console.warn('⚠️ Backend routes not found. Please deploy the new route files to production.');
      }
      // Don't log full error in production to avoid console spam
      if (process.env.NODE_ENV === 'development') {
        const errorText = await response.text();
        console.error('Error details:', errorText);
      }
    }
  } catch (error) {
    // Log error for debugging
    console.error('❌ Tracking error:', error);
  }
}

/**
 * Track a custom event
 */
export async function trackEvent(
  eventName: string,
  page: string,
  path: string,
  metadata?: Record<string, any>
) {
  // Respect Do Not Track
  if (hasDoNotTrack()) {
    return;
  }

  try {
    const apiUrl = getTrackingAPIUrl();
    await fetch(`${apiUrl}/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        page,
        path,
        metadata,
        sessionId: getSessionId()
      })
    });
  } catch (error) {
    // Silently fail
    console.error('Event tracking error:', error);
  }
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaName: string, page: string, path: string) {
  trackEvent('cta_click', page, path, { ctaName });
}

/**
 * Track project click
 */
export function trackProjectClick(projectId: string, projectTitle: string, page: string, path: string) {
  trackEvent('project_click', page, path, { projectId, projectTitle });
}

/**
 * Track external link click
 */
export function trackExternalLink(url: string, page: string, path: string) {
  trackEvent('external_link_click', page, path, { url });
}

