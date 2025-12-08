import { ImageResponse } from 'next/og'

export const alt = 'Sayed Safi - Full-Stack Web Developer | MERN Stack Expert'
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
          fontSize: 60,
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
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
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
          Sayed Safi
        </div>
        <div style={{ fontSize: 40, opacity: 0.9 }}>
          Full-Stack Web Developer
        </div>
        <div style={{ fontSize: 30, opacity: 0.8, marginTop: 10 }}>
          MERN Stack Expert | Bangladesh
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

