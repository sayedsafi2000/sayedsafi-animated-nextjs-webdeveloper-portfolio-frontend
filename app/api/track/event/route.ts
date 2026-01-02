/**
 * Next.js API Route - Proxy for tracking custom events
 * This hides the backend URL from the client
 */

import { NextRequest, NextResponse } from 'next/server';

// Get backend URL from server-side environment variable (not exposed to client)
function getBackendUrl(): string {
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
    
    // Forward request to backend
    const response = await fetch(`${backendUrl}/track/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') || '',
        'DNT': request.headers.get('dnt') || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error proxying track event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to track event' },
      { status: 500 }
    );
  }
}

