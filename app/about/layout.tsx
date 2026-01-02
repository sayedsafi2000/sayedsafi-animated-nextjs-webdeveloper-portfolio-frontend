import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me - Sayed Safi | Full-Stack Web Developer | MERN Stack Expert',
  description: 'Learn about Sayed Safi, a Full-Stack Web Developer from Bangladesh specializing in MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, and WordPress. Based in Sylhet, Bangladesh. Currently working at Asad Snapper.',
  keywords: [
    'Sayed Safi',
    'sayedsafi',
    'About Sayed Safi',
    'Full-Stack Developer',
    'MERN Stack Developer',
    'MedusaJS Developer',
    'Web Developer Bangladesh',
    'Web Developer Sylhet',
    'Sayed Safi Biography',
    'Sayed Safi Portfolio',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'MongoDB Developer',
    'WordPress Developer',
    'E-commerce Developer',
    'TypeScript Developer',
    'Bangladesh Developer',
    'Sylhet Developer',
  ],
  openGraph: {
    title: 'About Me - Sayed Safi | Full-Stack Web Developer',
    description: 'Learn about Sayed Safi, a Full-Stack Web Developer from Bangladesh specializing in MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, and WordPress.',
    url: 'https://sayedsafi.me/about',
    type: 'website',
    images: [
      {
        url: 'https://sayedsafi.me/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sayed Safi - About Me',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Me - Sayed Safi | Full-Stack Web Developer',
    description: 'Learn about Sayed Safi, a Full-Stack Web Developer from Bangladesh specializing in MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, and WordPress.',
    images: ['https://sayedsafi.me/opengraph-image'],
  },
  alternates: {
    canonical: 'https://sayedsafi.me/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

