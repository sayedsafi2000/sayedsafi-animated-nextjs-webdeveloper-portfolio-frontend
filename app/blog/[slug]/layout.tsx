import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // Fetch blog post directly from API (server-side)
    // Use environment variable only - no hardcoded URLs
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      return {
        title: 'Blog Post - Sayed Safi',
        description: 'Read web development blog posts by Sayed Safi.',
      }
    }
    
    const response = await fetch(`${apiUrl}/blog/${params.slug}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    
    if (!response.ok) {
      return {
        title: 'Blog Post Not Found - Sayed Safi',
        description: 'The requested blog post could not be found.',
      }
    }
    
    const data = await response.json()
    const post = data?.data?.post

    if (!post || !post.published) {
      return {
        title: 'Blog Post Not Found - Sayed Safi',
        description: 'The requested blog post could not be found.',
      }
    }

    const title = `${post.title} | Sayed Safi - Web Development Blog`
    const description = post.excerpt || `Read ${post.title} by Sayed Safi, a Full-Stack Web Developer from Bangladesh. Learn about ${post.category} and web development.`
    const keywords = [
      ...(post.tags || []),
      'Sayed Safi',
      'sayedsafi',
      'Web Development Blog',
      'MERN Stack',
      'Next.js',
      'React',
      'Node.js',
      'MedusaJS',
      'MongoDB',
      'WordPress',
      'Full-Stack Developer',
      'Web Developer Bangladesh',
    ]

    // Article Schema for SEO
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt || description,
      image: post.image || 'https://sayedsafi.me/opengraph-image',
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: post.author?.name || 'Sayed Safi',
        url: 'https://sayedsafi.me',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Sayed Safi',
        logo: {
          '@type': 'ImageObject',
          url: 'https://sayedsafi.me/logo.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://sayedsafi.me/blog/${params.slug}`,
      },
      keywords: keywords.join(', '),
    }

    return {
      title,
      description,
      keywords,
      openGraph: {
        title: post.title,
        description: post.excerpt || description,
        url: `https://sayedsafi.me/blog/${params.slug}`,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author?.name || 'Sayed Safi'],
        tags: post.tags || [],
        images: [
          {
            url: post.image || 'https://sayedsafi.me/opengraph-image',
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || description,
        images: [post.image || 'https://sayedsafi.me/opengraph-image'],
      },
      alternates: {
        canonical: `https://sayedsafi.me/blog/${params.slug}`,
      },
      other: {
        'schema': JSON.stringify(articleSchema),
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post - Sayed Safi',
      description: 'Read web development blog posts by Sayed Safi.',
    }
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <article itemScope itemType="https://schema.org/BlogPosting">
      {children}
    </article>
  )
}

