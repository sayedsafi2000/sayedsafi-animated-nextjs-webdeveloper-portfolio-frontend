'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Share2, Star, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import DOMPurify from 'dompurify'
import { useEffect, useState } from 'react'
import { blogAPI } from '@/lib/api'

const BlogComments = dynamic(() => import('@/components/BlogComments'), {
  ssr: false,
  loading: () => null,
})

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  image?: string
  imageAlt?: string
  link: string
  tags: string[]
  commentsCount?: number
  ratingsCount?: number
  ratingsTotal?: number
  ratingsAverage?: number
  author: {
    name: string
    bio: string
    image: string
  }
}

interface BlogDetailProps {
  post: BlogPost
}

interface RecentPost {
  _id: string
  slug: string
  title: string
  image?: string
  date: string
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const [sanitizedContent, setSanitizedContent] = useState('')
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([])
  const [stats, setStats] = useState(() => ({
    commentsCount: post.commentsCount || 0,
    ratingsCount: post.ratingsCount || 0,
    ratingsTotal: post.ratingsTotal || 0,
    ratingsAverage:
      typeof post.ratingsAverage === 'number'
        ? post.ratingsAverage
        : (post.ratingsCount || 0) > 0
          ? Math.round(((post.ratingsTotal || 0) / (post.ratingsCount || 0)) * 10) / 10
          : 0,
  }))

  useEffect(() => {
    if (post.content) {
      // Sanitize HTML content for safe rendering
      const clean = DOMPurify.sanitize(post.content, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre', 'span', 'div'],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style', 'target', 'rel']
      })
      setSanitizedContent(clean)
    } else {
      setSanitizedContent('')
    }
  }, [post.content])

  useEffect(() => {
    setStats({
      commentsCount: post.commentsCount || 0,
      ratingsCount: post.ratingsCount || 0,
      ratingsTotal: post.ratingsTotal || 0,
      ratingsAverage:
        typeof post.ratingsAverage === 'number'
          ? post.ratingsAverage
          : (post.ratingsCount || 0) > 0
            ? Math.round(((post.ratingsTotal || 0) / (post.ratingsCount || 0)) * 10) / 10
            : 0,
    })
  }, [post.slug])

  // Fetch recent posts (excluding current post)
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await blogAPI.getAll({
          limit: 7,
          page: 1,
          published: true
        })
        const allPosts = response.data.posts || []
        // Filter out current post and take up to 6-7 posts
        const filtered = allPosts
          .filter((p: any) => p.slug !== post.slug)
          .slice(0, 7)
        setRecentPosts(filtered)
      } catch (error) {
        console.error('Error fetching recent posts:', error)
        setRecentPosts([])
      }
    }
    fetchRecentPosts()
  }, [post.slug])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <article className="min-h-screen bg-white dark:bg-gray-900 pt-14 md:pt-16">
      {/* Article Header (NYTimes-inspired, matched to site colors) */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto py-6 md:py-8">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={18} />
                <span>Back to Blog</span>
              </Link>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share this article"
              >
                <Share2 size={16} />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {post.category}
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white">{post.author.name}</span>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => {
                    const value = i + 1
                    const filled = value <= Math.round(stats.ratingsAverage || 0)
                    return (
                      <Star
                        key={value}
                        size={16}
                        className={filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                        aria-hidden="true"
                      />
                    )
                  })}
                </div>
                <span className="text-sm">
                  {stats.ratingsAverage ? stats.ratingsAverage.toFixed(1) : '0.0'} ({stats.ratingsCount || 0})
                </span>
              </div>

              <a
                href="#comments"
                className="inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                aria-label="Jump to comments section"
              >
                <MessageCircle size={16} />
                <span>{stats.commentsCount || 0} comments</span>
              </a>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.slice(0, 8).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold
                      border border-gray-200 dark:border-gray-800
                      text-gray-700 dark:text-gray-300
                      bg-white dark:bg-gray-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 h-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-30" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-5xl mx-auto lg:mx-0">
          {/* Featured Image */}
          {post.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-10 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              <Image
                src={post.image}
                alt={post.imageAlt || `${post.title} - Blog post by Sayed Safi, Full-Stack Web Developer`}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-bold
              prose-p:font-serif prose-li:font-serif prose-blockquote:font-serif
              prose-p:text-gray-800 dark:prose-p:text-gray-200 prose-p:leading-relaxed prose-p:mb-5
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
              prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
              prose-blockquote:border-l-blue-500 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic
              prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
              prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
              prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4
              prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-2
              prose-hr:border-gray-300 dark:prose-hr:border-gray-700
              prose-img:rounded-lg prose-img:my-8"
          >
            {sanitizedContent ? (
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">Content is loading...</p>
            )}
          </motion.div>

          {/* Comments (lazy-load + fetch on scroll into view) */}
          <BlogComments
            slug={post.slug}
            initialStats={{
              commentsCount: stats.commentsCount,
              ratingsCount: stats.ratingsCount,
              ratingsTotal: stats.ratingsTotal,
              ratingsAverage: stats.ratingsAverage,
            }}
            onStatsChange={(next) => setStats(next)}
          />

          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to All Posts</span>
            </Link>
          </motion.div>
          </div>

          {/* Right Sidebar - Recent Posts */}
          {recentPosts.length > 0 && (
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
                >
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Posts</h2>
                  </div>
                  <div className="space-y-4">
                    {recentPosts.map((recentPost, index) => (
                      <Link
                        key={recentPost._id}
                        href={`/blog/${recentPost.slug}`}
                        className="block group"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="flex gap-3 hover:opacity-80 transition-opacity"
                        >
                          {/* Image */}
                          <div className="relative w-20 h-20 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-500 overflow-hidden">
                            {recentPost.image ? (
                              <Image
                                src={recentPost.image}
                                alt={recentPost.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="80px"
                                quality={75}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                }}
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90" />
                            )}
                          </div>
                          {/* Title */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                              {recentPost.title}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {formatDate(recentPost.date)}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            datePublished: post.date,
            author: {
              '@type': 'Person',
              name: post.author.name,
              description: post.author.bio,
            },
            publisher: {
              '@type': 'Person',
              name: 'Sayed Safi',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://sayedsafi.me${post.link}`,
            },
          }),
        }}
      />
    </article>
  )
}
