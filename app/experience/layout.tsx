import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience - Sayed Safi | Work Experience | Web Developer Career',
  description: 'View Sayed Safi\'s work experience as a Full-Stack Web Developer. Experience in MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, WordPress, and E-commerce Development. Currently working at Asad Snapper, Bangladesh.',
  keywords: [
    'Sayed Safi Experience',
    'sayedsafi experience',
    'Sayed Safi Work Experience',
    'Web Developer Experience',
    'MERN Stack Experience',
    'Full-Stack Developer Experience',
    'Next.js Experience',
    'React Experience',
    'Node.js Experience',
    'MedusaJS Experience',
    'WordPress Experience',
    'E-commerce Experience',
    'Web Developer Career',
    'Bangladesh Developer Experience',
    'Sylhet Developer Experience',
    'Asad Snapper',
    'Sayed Safi Resume',
    'Sayed Safi CV',
    'Web Developer Background',
  ],
  openGraph: {
    title: 'Experience - Sayed Safi | Work Experience',
    description: 'View Sayed Safi\'s work experience as a Full-Stack Web Developer. Experience in MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, and WordPress.',
    url: 'https://sayedsafi.me/experience',
    type: 'website',
    images: [
      {
        url: 'https://sayedsafi.me/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sayed Safi - Work Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience - Sayed Safi | Work Experience',
    description: 'View Sayed Safi\'s work experience as a Full-Stack Web Developer. Experience in MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, and WordPress.',
    images: ['https://sayedsafi.me/opengraph-image'],
  },
  alternates: {
    canonical: 'https://sayedsafi.me/experience',
  },
}

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

