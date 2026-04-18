'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Share2, Star, MessageCircle, Hash } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'
import { blogAPI, adsAPI } from '@/lib/api'
import AdDisplay from '@/components/AdDisplay'
import AdPopupManager from '@/components/AdPopup'

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
  views?: number
}

interface CategoryWithCount {
  name: string
  count: number
}

interface ArchiveItem {
  year: string
  month: string
  count: number
}

interface Ad {
  _id: string
  title: string
  description?: string
  image: string
  link: string
  priority: number
  createdAt?: string
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const [sanitizedContent, setSanitizedContent] = useState('')
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([])
  const [popularPosts, setPopularPosts] = useState<RecentPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [categoriesWithCounts, setCategoriesWithCounts] = useState<CategoryWithCount[]>([])
  const [archive, setArchive] = useState<ArchiveItem[]>([])
  const [popupAds, setPopupAds] = useState<Ad[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
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

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true)
        const response = await blogAPI.getCategories()
        const cats = response.data?.categories || []
        const catsWithCounts = response.data?.categoriesWithCounts || []
        setCategories(cats)
        setCategoriesWithCounts(catsWithCounts)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setCategoriesLoading(false)
      }
    }
    fetchCategories()
  }, [])

  // Fetch sidebar data and ads
  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        // Fetch recent posts (excluding current post)
        const recentResponse = await blogAPI.getAll({
          limit: 10,
          page: 1,
          published: true
        })
        const allPosts = recentResponse.data.posts || []
        const filteredRecent = allPosts
          .filter((p: any) => p.slug !== post.slug)
          .slice(0, 5)
        setRecentPosts(filteredRecent)

        // Fetch popular posts (by views or featured)
        const popularResponse = await blogAPI.getAll({
          limit: 10,
          page: 1,
          published: true
        })
        const allPopularPosts = popularResponse.data.posts || []
        const sortedPopular = [...allPopularPosts]
          .filter((p: any) => p.slug !== post.slug)
          .sort((a: any, b: any) => (b.views || 0) - (a.views || 0))
          .slice(0, 5)
        setPopularPosts(sortedPopular)

        // Build archive
        const archiveMap = new Map<string, { year: string; month: string; count: number }>()
        allPosts.forEach((p: any) => {
          if (p.date) {
            const date = new Date(p.date)
            const year = date.getFullYear().toString()
            const month = date.toLocaleDateString('en-US', { month: 'long' })
            const key = `${year}-${month}`
            const existing = archiveMap.get(key)
            if (existing) {
              existing.count++
            } else {
              archiveMap.set(key, { year, month, count: 1 })
            }
          }
        })
        const archiveList = Array.from(archiveMap.values())
          .sort((a, b) => {
            if (a.year !== b.year) return b.year.localeCompare(a.year)
            return new Date(`${b.month} 1, ${b.year}`).getTime() - new Date(`${a.month} 1, ${a.year}`).getTime()
          })
          .slice(0, 12)
        setArchive(archiveList)

        // Fetch ads
        const adsResponse = await adsAPI.getAll({ active: true, limit: 100 })
        const allAds = adsResponse.data?.ads || []
        // Sort by priority (highest first), then by creation date (oldest first for same priority)
        const sortedAds = allAds.sort((a: any, b: any) => {
          if (b.priority !== a.priority) {
            return b.priority - a.priority
          }
          // For same priority, show oldest first (created first)
          const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return aDate - bDate // Oldest first
        })
        // Latest 3 go to sidebar, rest go to popups
        const popupAdsList = sortedAds.slice(3)
        setPopupAds(popupAdsList)
      } catch (error) {
        console.error('Error fetching sidebar data:', error)
      }
    }
    fetchSidebarData()
  }, [post.slug])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const totalBlogs = categoriesWithCounts.reduce((sum, cat) => sum + cat.count, 0)

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
    <React.Fragment>
      <article className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Content with Sidebar */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Article Header */}
              <header className="mb-8">
                <div className="flex items-center justify-between gap-4 mb-4">
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

                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded mb-4">
                  {post.category}
                </span>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                  {post.title}
                </h1>
                
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
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
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.slice(0, 8).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-semibold
                          border border-gray-200 dark:border-gray-800
                          text-gray-700 dark:text-gray-300
                          bg-white dark:bg-gray-900"
                      >
                        <Hash size={12} className="inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Featured Image */}
              {post.image && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800"
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

              {/* Comments */}
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

            {/* Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                
                {/* Ad Display */}
                <AdDisplay />
                
                {/* Popular Posts */}
                {popularPosts.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Popular Posts</h3>
                    <div className="space-y-4">
                      {popularPosts.map((post) => (
                        <Link
                          key={post._id}
                          href={`/blog/${post.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-3">
                            <div className="relative w-16 h-16 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                              {post.image ? (
                                <Image
                                  src={post.image}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform"
                                  sizes="64px"
                                />
                              ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatDateShort(post.date)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
                  {categoriesLoading ? (
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/blog"
                        className="block w-full text-left px-3 py-2 rounded transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        All ({totalBlogs})
                      </Link>
                      {categoriesWithCounts.map((category) => (
                        <Link
                          key={category.name}
                          href={`/blog?category=${encodeURIComponent(category.name)}`}
                          className="block w-full text-left px-3 py-2 rounded transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {category.name} ({category.count})
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Blog Archive */}
                {archive.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Blog Archive</h3>
                    <div className="space-y-2">
                      {archive.map((item) => (
                        <div key={`${item.year}-${item.month}`} className="text-sm">
                          <Link
                            href={`/blog?archive=${item.year}-${item.month}`}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {item.month} {item.year} ({item.count})
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Posts */}
                {recentPosts.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Posts</h3>
                    <div className="space-y-4">
                      {recentPosts.slice(0, 5).map((post) => (
                        <Link
                          key={post._id}
                          href={`/blog/${post.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-3">
                            <div className="relative w-16 h-16 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                              {post.image ? (
                                <Image
                                  src={post.image}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform"
                                  sizes="64px"
                                />
                              ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatDateShort(post.date)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Ad Popup Manager */}
      {popupAds.length > 0 && <AdPopupManager ads={popupAds} />}

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
    </React.Fragment>
  )
}
