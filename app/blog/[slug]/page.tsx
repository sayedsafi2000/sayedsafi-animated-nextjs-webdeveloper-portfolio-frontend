'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import BlogDetail from '@/components/BlogDetail'
import { blogAPI } from '@/lib/api'

interface BlogPost {
  _id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  image: string
  imageAlt?: string
  link: string
  tags: string[]
  published: boolean
  status?: 'draft' | 'published' | 'scheduled'
  commentsCount?: number
  ratingsCount?: number
  ratingsTotal?: number
  ratingsAverage?: number
  author?: {
    name: string
    bio: string
    image: string
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await blogAPI.getBySlug(slug)
        if (response.data.post && response.data.post.published) {
          setPost(response.data.post)
        } else {
          setError(true)
        }
      } catch (error) {
        console.error('Error fetching blog post:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !post) {
    notFound()
  }

  // Transform API post to match BlogDetail component interface
  const blogPost = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    date: post.date,
    readTime: post.readTime,
    category: post.category,
    image: post.image,
    imageAlt: post.imageAlt,
    link: post.link,
    tags: post.tags || [],
    commentsCount: post.commentsCount || 0,
    ratingsCount: post.ratingsCount || 0,
    ratingsTotal: post.ratingsTotal || 0,
    ratingsAverage: typeof post.ratingsAverage === 'number' ? post.ratingsAverage : undefined,
    author: post.author || {
      name: 'Sayed Safi',
      bio: 'Full-Stack Web Developer specializing in modern web technologies',
      image: '/sayed-safi.jpg'
    }
  }

  return <BlogDetail post={blogPost} />
}
