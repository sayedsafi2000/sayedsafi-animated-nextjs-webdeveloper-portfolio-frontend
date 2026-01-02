import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Sayed Safi | Hire Web Developer | Get in Touch',
  description: 'Contact Sayed Safi, a Full-Stack Web Developer from Bangladesh. Hire for MERN Stack Development, Next.js Development, React Development, WordPress Development, E-commerce Solutions, and Custom Web Applications. Based in Sylhet, Bangladesh.',
  keywords: [
    'Contact Sayed Safi',
    'sayedsafi contact',
    'Hire Sayed Safi',
    'Hire Web Developer',
    'Hire MERN Stack Developer',
    'Hire Next.js Developer',
    'Hire React Developer',
    'Hire Full-Stack Developer',
    'Web Developer Bangladesh',
    'Web Developer Sylhet',
    'Freelance Web Developer',
    'Contact Web Developer',
    'Get in Touch Sayed Safi',
    'Sayed Safi Email',
    'Web Development Services Contact',
    'Hire MedusaJS Developer',
    'Hire WordPress Developer',
    'Web Development Quote',
    'Sayed Safi Contact Form',
  ],
  openGraph: {
    title: 'Contact - Sayed Safi | Hire Web Developer',
    description: 'Contact Sayed Safi, a Full-Stack Web Developer from Bangladesh. Hire for MERN Stack Development, Next.js Development, React Development, and Custom Web Applications.',
    url: 'https://sayedsafi.me/contact',
    type: 'website',
    images: [
      {
        url: 'https://sayedsafi.me/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sayed Safi - Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Sayed Safi | Hire Web Developer',
    description: 'Contact Sayed Safi, a Full-Stack Web Developer from Bangladesh. Hire for MERN Stack Development, Next.js Development, React Development, and Custom Web Applications.',
    images: ['https://sayedsafi.me/opengraph-image'],
  },
  alternates: {
    canonical: 'https://sayedsafi.me/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

