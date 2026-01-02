/**
 * Placeholder Image API Route
 * Generates placeholder images on the fly
 * Usage: /api/placeholder/600/400 or /api/placeholder/600/400/FF0000/FFFFFF
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ params: string[] }> | { params: string[] } }
) {
  try {
    // Handle both Promise and direct params (Next.js 13+ vs 15+)
    const resolvedParams = params instanceof Promise ? await params : params;
    
    // Parse dimensions and colors from URL
    // Format: /api/placeholder/width/height or /api/placeholder/width/height/bgColor/textColor
    const [width = '600', height = '400', bgColor = 'E5E7EB', textColor = '9CA3AF'] = resolvedParams.params;

    const w = parseInt(width) || 600;
    const h = parseInt(height) || 400;
    const bg = `#${bgColor}`;
    const text = `#${textColor}`;

    // Generate SVG placeholder
    const svg = `
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bg}"/>
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif" 
          font-size="24" 
          fill="${text}" 
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          ${w} × ${h}
        </text>
      </svg>
    `.trim();

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating placeholder:', error);
    return new NextResponse('Error generating placeholder', { status: 500 });
  }
}

