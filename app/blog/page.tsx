'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import StructuredData from '@/components/StructuredData'
import ScrollProgress from '@/components/ScrollProgress'
import SmoothScroll from '@/components/SmoothScroll'
import LoadingScreen from '@/components/LoadingScreen'
import Footer from '@/components/Footer'
import FloatingElements from '@/components/FloatingElements'
import { blogAPI } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Search, X, Hash } from 'lucide-react'
import AdDisplay from '@/components/AdDisplay'
import AdPopupManager from '@/components/AdPopup'

interface BlogPost {
  _id: string
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
  tags: string[]
  published: boolean
  views?: number
  featured?: boolean
}

interface CategoryWithCount {
  name: string
  count: number
}

interface ArchiveItem {
  year: string
  month: string
  count: number
  posts: BlogPost[]
}

interface Ad {
  _id: string
  title: string
  description?: string
  image: string
  link: string
  priority: number
}

export default function BlogPage() {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([])
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [categoriesWithCounts, setCategoriesWithCounts] = useState<CategoryWithCount[]>([])
  const [archive, setArchive] = useState<ArchiveItem[]>([])
  const [popupAds, setPopupAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const postsPerPage = 6

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setCurrentPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasVisited = sessionStorage.getItem('hasVisited')
      if (hasVisited) {
        setIsInitialLoad(false)
      } else {
        sessionStorage.setItem('hasVisited', 'true')
        const timer = setTimeout(() => {
          setIsInitialLoad(false)
        }, 800)
        return () => clearTimeout(timer)
      }
    }
  }, [])

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

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        
        // Fetch featured post (first featured or first post)
        const featuredResponse = await blogAPI.getAll({ 
          limit: 1, 
          page: 1,
          published: true
        })
        const featured = featuredResponse.data.posts?.[0] || null
        setFeaturedPost(featured)

        // Fetch main blog posts (skip featured if it exists)
        const skip = featured ? 1 : 0
        const response = await blogAPI.getAll({ 
          limit: postsPerPage, 
          page: currentPage,
          published: true,
          category: selectedCategory || undefined,
          search: debouncedSearch || undefined
        })
        const posts = response.data.posts || []
        // Filter out featured post from main list
        const filteredPosts = featured && posts[0]?._id === featured._id 
          ? posts.slice(1) 
          : posts
        setBlogPosts(filteredPosts)
        
        const pagination = response.data.pagination || {}
        setTotalPages(pagination.pages || pagination.totalPages || 1)
        
        // Fetch popular posts (by views or featured)
        const popularResponse = await blogAPI.getAll({
          limit: 5,
          page: 1,
          published: true
        })
        const allPosts = popularResponse.data.posts || []
        // Sort by views (if available) or use featured posts
        const sortedPopular = [...allPosts]
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 5)
        setPopularPosts(sortedPopular)

        // Fetch recent posts
        const recentResponse = await blogAPI.getAll({
          limit: 6,
          page: 1,
          published: true
        })
        setRecentPosts(recentResponse.data.posts || [])

        // Build archive from posts
        const archiveMap = new Map<string, ArchiveItem>()
        allPosts.forEach((post: BlogPost) => {
          const date = new Date(post.date)
          const year = date.getFullYear().toString()
          const month = date.toLocaleDateString('en-US', { month: 'long' })
          const key = `${year}-${month}`
          
          if (!archiveMap.has(key)) {
            archiveMap.set(key, {
              year,
              month,
              count: 0,
              posts: []
            })
          }
          const item = archiveMap.get(key)!
          item.count++
          item.posts.push(post)
        })
        setArchive(Array.from(archiveMap.values()).sort((a, b) => {
          if (a.year !== b.year) return parseInt(b.year) - parseInt(a.year)
          return new Date(`${b.month} 1, ${b.year}`).getTime() - new Date(`${a.month} 1, ${a.year}`).getTime()
        }))

        // Fetch ads for popups (all ads except latest 3 which go to sidebar)
        try {
          const { adsAPI } = await import('@/lib/api')
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
          console.error('Error fetching popup ads:', error)
        }

        // Update categories from posts if needed
        if (categories.length === 0 && posts.length > 0) {
          const categorySet = new Set<string>()
          allPosts.forEach((post: BlogPost) => {
            if (post.category) {
              categorySet.add(post.category)
            }
          })
          setCategories(Array.from(categorySet))
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setBlogPosts([])
        setRecentPosts([])
        setPopularPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [currentPage, selectedCategory, debouncedSearch, categories.length])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setCurrentPage(1)
  }

  const getCategoryCount = (categoryName: string) => {
    const category = categoriesWithCounts.find(c => c.name === categoryName)
    return category?.count || 0
  }

  const totalBlogs = categoriesWithCounts.reduce((sum, cat) => sum + cat.count, 0)

  return (
    <>
      {isInitialLoad && <LoadingScreen />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500"
      >
        <StructuredData />
        <ScrollProgress />
        <SmoothScroll />
        <FloatingElements />
        <Header />
        
        <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Main Content with Sidebar */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              
              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                
                {/* Featured Post */}
                {featuredPost && !selectedCategory && !debouncedSearch && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Post</h2>
                    <Link href={`/blog/${featuredPost.slug}`} className="block group">
                      <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                        <div className="md:flex">
                          <div className="md:w-1/2 relative h-64 md:h-auto">
                            {featuredPost.image ? (
                              <Image
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
                            )}
                          </div>
                          <div className="md:w-1/2 p-6 flex flex-col justify-between">
                            <div>
                              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded mb-3">
                                {featuredPost.category}
                              </span>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {featuredPost.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                {featuredPost.excerpt}
                              </p>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-4">
                                <span>{formatDate(featuredPost.date)}</span>
                                <span>•</span>
                                <span>{featuredPost.readTime}</span>
                              </div>
                              <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
                                Read More →
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.section>
                )}

                {/* Latest Posts */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {selectedCategory ? `${selectedCategory} Posts` : 'Latest Posts'}
                  </h2>
                  
                  {loading ? (
                    <div className="text-center py-20">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent"></div>
                      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blogs...</p>
                    </div>
                  ) : blogPosts.length === 0 ? (
                    <div className="text-center py-20">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No blogs found</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {(searchQuery || selectedCategory) 
                          ? 'Try adjusting your search or filters'
                          : 'No blog posts available at the moment.'}
                      </p>
                      {(searchQuery || selectedCategory) && (
                        <button
                          onClick={() => {
                            setSearchQuery('')
                            setSelectedCategory(null)
                            setCurrentPage(1)
                          }}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="space-y-6">
                        {blogPosts.map((post, index) => (
                          <Link
                            key={post._id}
                            href={`/blog/${post.slug}`}
                            className="block group"
                          >
                            <motion.article
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                            >
                              <div className="md:flex">
                                <div className="md:w-1/3 relative h-48 md:h-auto">
                                  {post.image ? (
                                    <Image
                                      src={post.image}
                                      alt={post.title}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                                      sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                  ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
                                  )}
                                </div>
                                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                                  <div>
                                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded mb-3">
                                      {post.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                      {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">
                                      {post.excerpt}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-4">
                                      <span>{formatDate(post.date)}</span>
                                      <span>•</span>
                                      <span>{post.readTime}</span>
                                    </div>
                                    <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
                                      Read More →
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </motion.article>
                          </Link>
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Previous
                          </button>
                          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i
                            if (page > totalPages) return null
                            return (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded transition-colors ${
                                  currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                              >
                                {page}
                              </button>
                            )
                          })}
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </section>
              </div>

              {/* Sidebar */}
              <aside className="lg:w-80 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  
                  {/* Ad Display */}
                  <AdDisplay />
                  
                  {/* Search */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Search</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800"
                      />
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

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
                        <button
                          onClick={() => handleCategoryClick(null)}
                          className={`w-full text-left px-3 py-2 rounded transition-colors ${
                            selectedCategory === null
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-semibold'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          All ({totalBlogs})
                        </button>
                        {categoriesWithCounts.map((category) => (
                          <button
                            key={category.name}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`w-full text-left px-3 py-2 rounded transition-colors ${
                              selectedCategory === category.name
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-semibold'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            {category.name} ({category.count})
                          </button>
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
        </div>
        
        {/* Ad Popup Manager */}
        {popupAds.length > 0 && <AdPopupManager ads={popupAds} />}
        
        <Footer />
      </motion.main>
    </>
  )
}
