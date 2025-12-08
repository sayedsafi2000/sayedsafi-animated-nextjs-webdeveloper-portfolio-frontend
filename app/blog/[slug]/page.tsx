import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogDetail from '@/components/BlogDetail'
import { blogPosts } from '@/data/blogPosts'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: `${post.title} | Sayed Safi - Full-Stack Web Developer`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: 'Sayed Safi' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Sayed Safi'],
      tags: post.tags,
      images: [
        {
          url: post.image || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image || '/og-image.jpg'],
    },
    alternates: {
      canonical: `https://sayedsafi.me/blog/${post.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return <BlogDetail post={post} />
}

