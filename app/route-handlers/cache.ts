import { NextResponse } from 'next/server'

export function GET() {
  const response = NextResponse.json({ cached: true })
  
  // Set cache headers
  response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  
  return response
}

