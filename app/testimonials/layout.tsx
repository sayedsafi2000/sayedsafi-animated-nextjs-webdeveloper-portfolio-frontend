import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testimonials - Sayed Safi | Client Reviews | Web Developer Reviews',
  description: 'Read client testimonials and reviews for Sayed Safi, a Full-Stack Web Developer from Bangladesh. Reviews from clients who worked on MERN Stack projects, Next.js websites, WordPress sites, and E-commerce solutions.',
  keywords: [
    'Sayed Safi Testimonials',
    'sayedsafi testimonials',
    'Sayed Safi Reviews',
    'Web Developer Reviews',
    'MERN Stack Developer Reviews',
    'Next.js Developer Reviews',
    'React Developer Reviews',
    'Client Testimonials',
    'Web Developer Feedback',
    'Bangladesh Developer Reviews',
    'Sylhet Developer Reviews',
    'Full-Stack Developer Reviews',
    'WordPress Developer Reviews',
    'E-commerce Developer Reviews',
    'Sayed Safi Client Reviews',
    'Web Development Testimonials',
    'Portfolio Reviews',
  ],
  openGraph: {
    title: 'Testimonials - Sayed Safi | Client Reviews',
    description: 'Read client testimonials and reviews for Sayed Safi, a Full-Stack Web Developer from Bangladesh specializing in MERN Stack, Next.js, React, and WordPress.',
    url: 'https://sayedsafi.me/testimonials',
    type: 'website',
    images: [
      {
        url: 'https://sayedsafi.me/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sayed Safi - Client Testimonials',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testimonials - Sayed Safi | Client Reviews',
    description: 'Read client testimonials and reviews for Sayed Safi, a Full-Stack Web Developer from Bangladesh specializing in MERN Stack, Next.js, React, and WordPress.',
    images: ['https://sayedsafi.me/opengraph-image'],
  },
  alternates: {
    canonical: 'https://sayedsafi.me/testimonials',
  },
}

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

