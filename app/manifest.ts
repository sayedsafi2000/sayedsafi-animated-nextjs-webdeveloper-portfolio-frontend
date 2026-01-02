import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sayed Safi - Full-Stack Web Developer',
    short_name: 'Sayed Safi',
    description: 'Portfolio of Sayed Safi, a Full-Stack Web Developer specializing in MERN Stack, Next.js, React, Node.js, and WordPress',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}

