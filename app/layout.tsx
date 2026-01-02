import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import PageTracker from '@/components/PageTracker'

const josefinSans = Josefin_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-josefin-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sayedsafi.me'),
  title: {
    default: 'Sayed Safi - Full-Stack Web Developer | MERN Stack Expert | Bangladesh',
    template: '%s | Sayed Safi - Full-Stack Web Developer',
  },
  description: 'Sayed Safi is a Full-Stack Web Developer from Bangladesh specializing in MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, and WordPress. Currently working at Asad Snapper. Expert in building modern web applications, e-commerce solutions, and responsive websites. Based in Sylhet, Bangladesh.',
  keywords: [
    'Sayed Safi',
    'sayedsafi',
    'Sayed MD Safiuddin Safi',
    'sayedsafi2000',
    'Full-Stack Developer',
    'Full-Stack Web Developer',
    'MERN Stack Developer',
    'MERN Stack',
    'MedusaJS Developer',
    'MedusaJS',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'MongoDB Developer',
    'WordPress Developer',
    'E-commerce Developer',
    'TypeScript Developer',
    'Web Developer',
    'Web Developer Bangladesh',
    'Web Developer Sylhet',
    'Freelance Web Developer',
    'Portfolio Website',
    'Web Development Services',
    'Custom Website Development',
    'E-commerce Solutions',
    'Musafir Store',
    'Asad Snapper',
    'Metropolitan University Sylhet',
    'Boteshwor Sylhet',
    'Bangladesh Web Developer',
    'Sylhet Web Developer',
    'React.js Developer',
    'Express.js Developer',
    'MongoDB Expert',
    'JavaScript Developer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Engineer',
    'Software Developer Bangladesh',
  ],
  authors: [{ name: 'Sayed Safi', url: 'https://sayedsafi.me' }],
  creator: 'Sayed Safi',
  publisher: 'Sayed Safi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sayedsafi.me',
    siteName: 'Sayed Safi - Portfolio',
    title: 'Sayed Safi - Full-Stack Web Developer | MERN Stack Expert',
    description: 'Full-Stack Web Developer from Bangladesh specializing in MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, and WordPress. Expert in building modern web applications and e-commerce solutions.',
    images: [
      {
        url: 'https://sayedsafi.me/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sayed Safi - Full-Stack Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayed Safi - Full-Stack Web Developer | MERN Stack Expert',
    description: 'Full-Stack Web Developer from Bangladesh. Expert in MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, and WordPress.',
    creator: '@sayedsafiii',
    images: ['https://sayedsafi.me/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sayedsafi.me',
    languages: {
      'en-US': 'https://sayedsafi.me',
    },
  },
  category: 'Technology',
  classification: 'Portfolio Website',
  other: {
    'geo.region': 'BD-60',
    'geo.placename': 'Sylhet',
    'geo.position': '24.8949;91.8687',
    'ICBM': '24.8949, 91.8687',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Import schemas
  const { personSchema, websiteSchema, professionalServiceSchema, organizationSchema, faqSchema } = require('@/lib/schema')

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://sayedsafi.me" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="BD-60" />
        <meta name="geo.placename" content="Sylhet, Bangladesh" />
        <meta name="geo.position" content="24.8949;91.8687" />
        <meta name="ICBM" content="24.8949, 91.8687" />
        
        {/* Additional SEO */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Sayed Safi" />
        <meta name="email" content="sayedmdsafiuddin@gmail.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        
        {/* Structured Data - Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* Structured Data - Professional Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        {/* Structured Data - FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        
        {/* RSS Feed Link */}
        <link rel="alternate" type="application/rss+xml" title="Sayed Safi Blog RSS Feed" href="https://sayedsafi.me/feed.xml" />
        
        {/* Favicon */}
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
      </head>
      <body className={josefinSans.variable}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <PageTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

