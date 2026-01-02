import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Sayed Safi | Web Development Services | MERN Stack Development',
  description: 'Professional web development services by Sayed Safi including Full-Stack Development, MERN Stack Development, Next.js Development, React Development, WordPress Development, E-commerce Solutions, MedusaJS Development, and Custom Web Applications. Based in Bangladesh.',
  keywords: [
    'Sayed Safi Services',
    'sayedsafi services',
    'Web Development Services',
    'MERN Stack Development',
    'Next.js Development Services',
    'React Development Services',
    'WordPress Development',
    'E-commerce Development',
    'MedusaJS Development',
    'Full-Stack Development Services',
    'Custom Web Development',
    'Web Developer Services Bangladesh',
    'Web Developer Services Sylhet',
    'Freelance Web Developer',
    'Hire Web Developer',
    'Hire MERN Stack Developer',
    'Hire Next.js Developer',
    'Hire React Developer',
    'Web Development Company',
    'Sayed Safi Freelance',
  ],
  openGraph: {
    title: 'Services - Sayed Safi | Web Development Services',
    description: 'Professional web development services including Full-Stack Development, MERN Stack Development, Next.js Development, React Development, WordPress Development, and E-commerce Solutions.',
    url: 'https://sayedsafi.me/services',
    type: 'website',
    images: [
      {
        url: 'https://sayedsafi.me/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sayed Safi - Web Development Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services - Sayed Safi | Web Development Services',
    description: 'Professional web development services including Full-Stack Development, MERN Stack Development, Next.js Development, React Development, WordPress Development, and E-commerce Solutions.',
    images: ['https://sayedsafi.me/opengraph-image'],
  },
  alternates: {
    canonical: 'https://sayedsafi.me/services',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

