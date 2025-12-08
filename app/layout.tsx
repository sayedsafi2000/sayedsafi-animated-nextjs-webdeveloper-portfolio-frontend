import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

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
    'Sayed MD Safiuddin Safi',
    'sayedsafi2000',
    'Full-Stack Developer',
    'MERN Stack Developer',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'MongoDB Developer',
    'WordPress Developer',
    'E-commerce Developer',
    'MedusaJS Developer',
    'TypeScript Developer',
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
        url: 'https://sayedsafi.me/og-image.jpg',
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
    images: ['https://sayedsafi.me/og-image.jpg'],
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
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sayed Safi',
    alternateName: 'Sayed MD Safiuddin Safi',
    url: 'https://sayedsafi.me',
    jobTitle: 'Full-Stack Web Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Asad Snapper',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Boteshwor',
      addressRegion: 'Sylhet',
      addressCountry: 'BD',
    },
    email: 'sayedmdsafiuddin@gmail.com',
    sameAs: [
      'https://github.com/sayedsafi2000',
      'https://www.linkedin.com/in/sayed-safi/',
      'https://www.facebook.com/sayedsafiii',
      'https://www.instagram.com/sayedsafiii/',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://sayedsafi.me" />
        <meta name="geo.region" content="BD-60" />
        <meta name="geo.placename" content="Sylhet, Bangladesh" />
        <meta name="geo.position" content="24.8949;91.8687" />
        <meta name="ICBM" content="24.8949, 91.8687" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={josefinSans.variable}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

