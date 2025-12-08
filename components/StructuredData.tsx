'use client'

export default function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sayed Safi',
    alternateName: 'Sayed MD Safiuddin Safi',
    url: 'https://sayedsafi.me',
    image: 'https://sayedsafi.me/og-image.jpg',
    jobTitle: 'Full-Stack Web Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Asad Snapper',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Metropolitan University, Sylhet',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sylhet',
          addressCountry: 'BD',
        },
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Moulvibazar Polytechnic Institute',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Moulvibazar',
          addressCountry: 'BD',
        },
      },
    ],
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
    knowsAbout: [
      'MERN Stack',
      'Next.js',
      'React',
      'Node.js',
      'MongoDB',
      'WordPress',
      'MedusaJS',
      'TypeScript',
      'JavaScript',
      'E-commerce Development',
      'Web Development',
      'Full-Stack Development',
    ],
    description: 'Full-Stack Web Developer from Bangladesh specializing in MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, and WordPress. Expert in building modern web applications and e-commerce solutions.',
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sayed Safi - Portfolio',
    url: 'https://sayedsafi.me',
    description: 'Portfolio website of Sayed Safi, a Full-Stack Web Developer from Bangladesh',
    author: {
      '@type': 'Person',
      name: 'Sayed Safi',
    },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://sayedsafi.me/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sayed Safi - Web Development Services',
    description: 'Full-Stack Web Development Services including MERN Stack, Next.js, React, WordPress, and E-commerce Solutions',
    provider: {
      '@type': 'Person',
      name: 'Sayed Safi',
      email: 'sayedmdsafiuddin@gmail.com',
      url: 'https://sayedsafi.me',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    serviceType: [
      'Web Development',
      'Full-Stack Development',
      'E-commerce Development',
      'WordPress Development',
      'MERN Stack Development',
    ],
    url: 'https://sayedsafi.me',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://sayedsafi.me',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://sayedsafi.me/#about',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Projects',
        item: 'https://sayedsafi.me/#projects',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Blog',
        item: 'https://sayedsafi.me/#blog',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: 'https://sayedsafi.me/#contact',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

