import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Sayed Safi | Web Development Portfolio | MERN Stack Projects',
  description: 'Explore Sayed Safi\'s web development projects including MERN Stack applications, Next.js websites, WordPress sites, e-commerce solutions, and custom web applications. View portfolio of Full-Stack Developer from Bangladesh.',
  keywords: [
    'Sayed Safi Projects',
    'sayedsafi projects',
    'MERN Stack Projects',
    'Next.js Projects',
    'React Projects',
    'WordPress Projects',
    'E-commerce Projects',
    'Web Development Portfolio',
    'Full-Stack Developer Projects',
    'MedusaJS Projects',
    'Node.js Projects',
    'MongoDB Projects',
    'Web Developer Portfolio',
    'Bangladesh Developer Projects',
    'Sylhet Developer Portfolio',
    'Custom Web Applications',
    'Web Development Case Studies',
    'Portfolio Projects',
    'Sayed Safi Work',
    'Sayed Safi Portfolio',
  ],
  openGraph: {
    title: 'Projects - Sayed Safi | Web Development Portfolio',
    description: 'Explore Sayed Safi\'s web development projects including MERN Stack applications, Next.js websites, WordPress sites, and e-commerce solutions.',
    url: 'https://sayedsafi.me/projects',
    type: 'website',
    images: [
      {
        url: 'https://sayedsafi.me/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sayed Safi - Projects Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Sayed Safi | Web Development Portfolio',
    description: 'Explore Sayed Safi\'s web development projects including MERN Stack applications, Next.js websites, WordPress sites, and e-commerce solutions.',
    images: ['https://sayedsafi.me/opengraph-image'],
  },
  alternates: {
    canonical: 'https://sayedsafi.me/projects',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

