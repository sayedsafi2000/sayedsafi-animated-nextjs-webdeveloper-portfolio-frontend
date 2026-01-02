import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Sayed Safi | Web Development Blog | MERN Stack Tutorials',
  description: 'Read web development blog posts by Sayed Safi covering MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, WordPress, TypeScript, and modern web development best practices. Learn from a Full-Stack Developer from Bangladesh.',
  keywords: [
    'Sayed Safi Blog',
    'sayedsafi blog',
    'Web Development Blog',
    'MERN Stack Blog',
    'Next.js Tutorials',
    'React Tutorials',
    'Node.js Tutorials',
    'MedusaJS Tutorials',
    'MongoDB Tutorials',
    'WordPress Tutorials',
    'TypeScript Tutorials',
    'Web Development Articles',
    'Full-Stack Development Blog',
    'Programming Blog Bangladesh',
    'Web Developer Blog',
    'MERN Stack Tutorials',
    'JavaScript Tutorials',
    'Web Development Tips',
    'Sayed Safi Articles',
    'Web Development Guides',
  ],
  openGraph: {
    title: 'Blog - Sayed Safi | Web Development Blog',
    description: 'Read web development blog posts covering MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, WordPress, and modern web development best practices.',
    url: 'https://sayedsafi.me/blog',
    type: 'website',
    images: [
      {
        url: 'https://sayedsafi.me/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sayed Safi - Web Development Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Sayed Safi | Web Development Blog',
    description: 'Read web development blog posts covering MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, WordPress, and modern web development best practices.',
    images: ['https://sayedsafi.me/opengraph-image'],
  },
  alternates: {
    canonical: 'https://sayedsafi.me/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

