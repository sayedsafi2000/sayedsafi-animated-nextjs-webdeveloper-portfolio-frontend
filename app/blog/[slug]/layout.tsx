import type { Metadata } from 'next'
import Header from '@/components/Header'

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

    // Use SEO fields if available, otherwise fallback to defaults
    const seoTitle = post.seoTitle || post.title
    const metaDesc = post.metaDescription || post.excerpt || `Read ${post.title} by Sayed Safi, a Full-Stack Web Developer from Bangladesh. Learn about ${post.category} and web development.`
    const title = post.seoTitle ? `${post.seoTitle} | Sayed Safi` : `${post.title} | Sayed Safi - Web Development Blog`
    const description = metaDesc
    const keywords = [
      ...(post.focusKeyword ? [post.focusKeyword] : []),
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
    
    // Determine canonical URL
    const canonicalUrl = post.canonicalUrl || `https://sayedsafi.me/blog/${params.slug}`
    
    // Robots meta
    const robotsIndex = post.robots?.index !== undefined ? post.robots.index : true
    const robotsFollow = post.robots?.follow !== undefined ? post.robots.follow : true
    const robotsMeta = `${robotsIndex ? 'index' : 'noindex'}, ${robotsFollow ? 'follow' : 'nofollow'}`
    
    // Open Graph fields
    const ogTitle = post.ogTitle || seoTitle
    const ogDescription = post.ogDescription || metaDesc
    const ogImage = post.ogImage || post.image || 'https://sayedsafi.me/opengraph-image'
    
    // Twitter Card
    const twitterCard = post.twitterCard || 'summary_large_image'
    
    // Schema type
    const schemaType = post.schemaType || 'BlogPosting'

    // Article Schema for SEO
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      headline: seoTitle,
      description: metaDesc,
      image: ogImage,
      datePublished: post.publishedAt || post.date,
      dateModified: post.updatedAt || post.date,
      author: {
        '@type': 'Person',
        name: post.author?.name || 'Sayed Safi',
        url: 'https://sayedsafi.me',
        ...(post.author?.bio && { description: post.author.bio }),
        ...(post.author?.image && { image: post.author.image }),
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
        '@id': canonicalUrl,
      },
      ...(post.focusKeyword && { keywords: [post.focusKeyword, ...(post.tags || [])].join(', ') }),
      ...(post.breadcrumbsEnabled !== false && {
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://sayedsafi.me'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: 'https://sayedsafi.me/blog'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: seoTitle,
              item: canonicalUrl
            }
          ]
        }
      }),
    }

    return {
      title,
      description,
      keywords,
      robots: {
        index: robotsIndex,
        follow: robotsFollow,
      },
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: canonicalUrl,
        type: 'article',
        publishedTime: post.publishedAt || post.date,
        modifiedTime: post.updatedAt || post.date,
        authors: [post.author?.name || 'Sayed Safi'],
        tags: post.tags || [],
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.imageAlt || post.title,
          },
        ],
      },
      twitter: {
        card: twitterCard,
        title: ogTitle,
        description: ogDescription,
        images: [ogImage],
      },
      alternates: {
        canonical: canonicalUrl,
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
    <>
      <Header forceSolid size="compact" />
      <article itemScope itemType="https://schema.org/BlogPosting">
        {children}
      </article>
    </>
  )
}

