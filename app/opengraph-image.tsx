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
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              marginBottom: 16,
            }}
          >
            Sayed Safi
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Full-Stack Web Developer
          </div>
          <div
            style={{
              fontSize: 32,
              marginTop: 8,
            }}
          >
            MERN Stack Expert | Next.js | React | Node.js
          </div>
          <div
            style={{
              fontSize: 28,
              marginTop: 16,
              fontWeight: 500,
            }}
          >
            Bangladesh | Available for Hire
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

