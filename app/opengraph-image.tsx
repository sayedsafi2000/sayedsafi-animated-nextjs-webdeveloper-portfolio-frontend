import { ImageResponse } from 'next/og'

export const alt = 'Sayed Safi - Full-Stack Web Developer | MERN Stack Expert | Hire Next.js Developer Bangladesh'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #ec4899 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            opacity: 0.3,
          }}
        />
        
        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            textAlign: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              marginBottom: 16,
              textShadow: '0 4px 12px rgba(0,0,0,0.3)',
              letterSpacing: '-0.02em',
            }}
          >
            Sayed Safi
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 600,
              opacity: 0.95,
              marginBottom: 12,
              textShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            Full-Stack Web Developer
          </div>
          <div
            style={{
              fontSize: 32,
              opacity: 0.9,
              marginTop: 8,
              textShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            MERN Stack Expert | Next.js | React | Node.js
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.85,
              marginTop: 16,
              fontWeight: 500,
            }}
          >
            🇧🇩 Bangladesh | Available for Hire
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

