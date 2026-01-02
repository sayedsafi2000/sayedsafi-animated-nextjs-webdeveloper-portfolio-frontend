export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sayed Safi',
  alternateName: ['Sayed MD Safiuddin Safi', 'sayedsafi', 'sayedsafi2000'],
  url: 'https://sayedsafi.me',
  image: 'https://sayedsafi.me/sayed-safi.jpg',
  jobTitle: 'Full-Stack Web Developer',
  email: 'sayedmdsafiuddin@gmail.com',
  telephone: '+880',
  worksFor: {
    '@type': 'Organization',
    name: 'Asad Snapper',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Boteshwor',
    addressRegion: 'Sylhet',
    addressCountry: 'BD',
    postalCode: '3100',
  },
  knowsLanguage: ['Bengali', 'English'],
  knowsAbout: [
    'MERN Stack',
    'Next.js',
    'React',
    'Node.js',
    'MongoDB',
    'MedusaJS',
    'E-commerce',
    'WordPress',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Full-Stack Development',
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'React.js',
    'Next.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'MySQL',
    'MedusaJS',
    'WordPress',
    'Tailwind CSS',
    'HTML5',
    'CSS3',
    'RESTful APIs',
    'GraphQL',
    'Git',
    'Docker',
    'AWS',
  ],
  sameAs: [
    'https://github.com/sayedsafi2000',
    'https://www.linkedin.com/in/sayed-safi/',
    'https://www.facebook.com/sayedsafiii',
    'https://www.instagram.com/sayedsafiii/',
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://sayedsafi.me',
  name: 'Sayed Safi - Full-Stack Web Developer | MERN Stack Expert | Bangladesh',
  description: 'Full-Stack Web Developer specializing in MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, and WordPress. Based in Bangladesh.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://sayedsafi.me/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Sayed Safi Web Development Services',
  url: 'https://sayedsafi.me',
  description: 'Professional web development services including MERN Stack, Next.js, React, Node.js, and E-commerce solutions.',
  areaServed: 'BD',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BD',
    addressRegion: 'Sylhet',
    addressLocality: 'Boteshwor',
  },
  priceRange: '$$',
  serviceType: [
    'Full-Stack Web Development',
    'MERN Stack Development',
    'Next.js Development',
    'React Development',
    'WordPress Development',
    'E-commerce Development',
    'MedusaJS Development',
    'API Development',
    'Database Design',
    'Web Optimization',
  ],
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sayed Safi',
  url: 'https://sayedsafi.me',
  logo: 'https://sayedsafi.me/logo.png',
  email: 'sayedmdsafiuddin@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BD',
    addressRegion: 'Sylhet',
    addressLocality: 'Boteshwor',
  },
  sameAs: [
    'https://github.com/sayedsafi2000',
    'https://www.linkedin.com/in/sayed-safi/',
    'https://www.facebook.com/sayedsafiii',
    'https://www.instagram.com/sayedsafiii/',
  ],
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does Sayed Safi provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sayed Safi provides Full-Stack Web Development services including MERN Stack Development, Next.js Development, React Development, WordPress Development, E-commerce Solutions, and MedusaJS Development.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is MERN Stack?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MERN Stack is a modern JavaScript framework consisting of MongoDB (database), Express.js (backend), React (frontend), and Node.js (runtime). It is ideal for building scalable, fast, and modern web applications.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Sayed Safi develop WordPress websites?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Sayed Safi has experience developing WordPress websites and can help with custom WordPress development, theme customization, and plugin development.',
      },
    },
  ],
}

