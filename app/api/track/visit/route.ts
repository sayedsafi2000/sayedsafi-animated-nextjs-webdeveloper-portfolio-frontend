/**
 * Next.js API Route - Proxy for tracking page visits
 * This hides the backend URL from the client
 */

import { NextRequest, NextResponse } from 'next/server';

// Get backend URL from server-side environment variable (not exposed to client)
function getBackendUrl(): string {
  // Use server-side only environment variable (no NEXT_PUBLIC_ prefix)
  const backendUrl = process.env.BACKEND_URL || process.env.API_URL;
  
  if (backendUrl && backendUrl.trim() !== '') {
    return backendUrl.trim();
  }
  
  // Local development fallback
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000/api';
  }
  
  // Production fallback
  return 'https://backend.sayedsafi.me/api';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl = getBackendUrl();
    
    // Get client IP from request (for geolocation)
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    // Forward request to backend with client IP in headers
    const response = await fetch(`${backendUrl}/track/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward important headers for tracking
        'User-Agent': request.headers.get('user-agent') || '',
        'DNT': request.headers.get('dnt') || '',
        'X-Forwarded-For': clientIp,
        'Referer': request.headers.get('referer') || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error proxying track visit:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to track visit' },
      { status: 500 }
    );
  }
}

