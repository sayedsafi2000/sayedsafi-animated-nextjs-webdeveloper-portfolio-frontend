/**
 * Next.js API Route - Proxy for creating leads (contact form)
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
    
    // Get client IP from request headers (try multiple sources for reliability)
    // x-vercel-forwarded-for: Vercel-specific, contains real client IP
    // x-forwarded-for: may contain multiple IPs (client, proxy1, proxy2), first is client
    // x-real-ip: set by some proxies/load balancers
    // cf-connecting-ip: Cloudflare
    const clientIp = 
      request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip')?.trim() ||
      request.headers.get('cf-connecting-ip')?.trim() ||
      'unknown';
    
    // Forward request to backend with client IP in headers
    const response = await fetch(`${backendUrl}/leads/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') || '',
        'X-Forwarded-For': clientIp,
        'X-Real-IP': clientIp,
        'Referer': request.headers.get('referer') || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error proxying lead creation:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create lead' },
      { status: 500 }
    );
  }
}

