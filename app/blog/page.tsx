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
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, Search, X, Hash, ArrowLeft } from 'lucide-react'

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
}

interface CategoryWithCount {
  name: string
  count: number
}

export default function BlogPage() {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [categoriesWithCounts, setCategoriesWithCounts] = useState<CategoryWithCount[]>([])
  const [loading, setLoading] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const postsPerPage = 3

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
        
        // If categoriesWithCounts is empty but categories exist, create counts from categories
        if (catsWithCounts.length === 0 && cats.length > 0) {
          const counts = await Promise.all(
            cats.map(async (cat: string) => {
              try {
                const blogResponse = await blogAPI.getAll({ 
                  published: true, 
                  category: cat,
                  limit: 1 
                })
                return {
                  name: cat,
                  count: blogResponse.data?.pagination?.total || 0
                }
              } catch {
                return { name: cat, count: 0 }
              }
            })
          )
          setCategoriesWithCounts(counts.filter((c: CategoryWithCount) => c.count > 0))
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Categories will be populated from blog posts in the blog fetch effect
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
        const response = await blogAPI.getAll({ 
          limit: postsPerPage, 
          page: currentPage,
          published: true,
          category: selectedCategory || undefined,
          search: debouncedSearch || undefined
        })
        const posts = response.data.posts || []
        const pagination = response.data.pagination || {}
        setBlogPosts(posts)
        // Backend returns 'pages' not 'totalPages'
        setTotalPages(pagination.pages || pagination.totalPages || 1)
        
        // Fetch recent posts (next 3 posts or previous 3 posts)
        const recentPage = currentPage === 1 ? 2 : currentPage - 1
        if (recentPage >= 1 && recentPage <= (pagination.pages || pagination.totalPages || 1)) {
          try {
            const recentResponse = await blogAPI.getAll({
              limit: postsPerPage,
              page: recentPage,
              published: true,
              category: selectedCategory || undefined,
              search: debouncedSearch || undefined
            })
            setRecentPosts(recentResponse.data.posts || [])
          } catch (error) {
            console.error('Error fetching recent posts:', error)
            setRecentPosts([])
          }
        } else {
          setRecentPosts([])
        }
        
        // Update categories from posts if categories haven't loaded yet
        if (categories.length === 0 && posts.length > 0) {
          const categorySet = new Set<string>()
          posts.forEach((post: BlogPost) => {
            if (post.category) {
              categorySet.add(post.category)
            }
          })
          const uniqueCategories: string[] = Array.from(categorySet)
          const categoryCounts: CategoryWithCount[] = uniqueCategories.map((cat: string) => ({
            name: cat,
            count: posts.filter((p: BlogPost) => p.category === cat).length
          }))
          setCategories(uniqueCategories)
          setCategoriesWithCounts(categoryCounts)
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setBlogPosts([])
        setRecentPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [currentPage, selectedCategory, debouncedSearch])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
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
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500"
      >
        <StructuredData />
        <ScrollProgress />
        <SmoothScroll />
        <FloatingElements />
        <Header />
        
        {/* Blog Header */}
        <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </Link>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
              All Blogs
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-12">
              A comprehensive collection of my web development articles and insights
            </p>

            {/* Main Content with Sidebar */}
            <div className="py-12 pb-20">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              
              {/* Main Content Area - Blog Posts */}
              <div className="flex-1 min-w-0">
                {loading ? (
                  <div className="text-center py-20">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block rounded-full h-16 w-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400"
                    />
                    <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">Loading blogs...</p>
                  </div>
                ) : blogPosts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                  >
                    <div className="inline-block p-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl mb-6">
                      <Search className="w-16 h-16 text-blue-500 dark:text-blue-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">No blogs found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
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
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                      >
                        Clear Filters
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-6">
                      {blogPosts.map((post, index) => (
                        <Link
                          key={post._id}
                          href={`/blog/${post.slug}`}
                          aria-label={`Open blog post: ${post.title}`}
                          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                        >
                          <motion.article
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ 
                              delay: index * 0.08, 
                              duration: 0.6,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            viewport={{ once: true, margin: '-50px' }}
                            whileHover={{ 
                              y: -8,
                              scale: 1.02,
                              transition: { duration: 0.3 }
                            }}
                            className="group relative bg-white dark:bg-gray-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer h-full flex flex-col"
                          >
                            {/* Image */}
                            <div className="relative w-full h-64 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
                              {post.image ? (
                                <Image
                                  src={post.image}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                                  sizes="100vw"
                                  quality={80}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.style.display = 'none'
                                  }}
                                />
                              ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-pink-600/90" />
                              )}
                              
                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              
                              {/* Category Badge */}
                              <div className="absolute top-4 left-4 px-4 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-full shadow-lg">
                                <span className="text-gray-900 dark:text-white text-xs font-bold uppercase tracking-wide">{post.category}</span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col">
                              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                                <div className="flex items-center gap-1.5">
                                  <Calendar size={14} className="text-blue-500" />
                                  <span className="font-medium">{formatDate(post.date)}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Clock size={14} className="text-purple-500" />
                                  <span className="font-medium">{post.readTime}</span>
                                </div>
                              </div>

                              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                                {post.title}
                              </h3>

                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed line-clamp-3 flex-1">
                                {post.excerpt}
                              </p>

                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-5">
                                  {post.tags.slice(0, 3).map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold border border-blue-200 dark:border-blue-800"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors text-sm mt-auto">
                                <span>Read Article</span>
                                <ArrowRight size={18} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all pointer-events-none rounded-2xl"
                              initial={false}
                            />
                          </motion.article>
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center items-center gap-3 mt-12 mb-8 py-6"
                      >
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-semibold shadow-md hover:shadow-lg"
                        >
                          <ChevronLeft size={18} />
                          <span>Previous</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                              return (
                                <button
                                  key={page}
                                  onClick={() => setCurrentPage(page)}
                                  className={`px-5 py-3 font-bold transition-all shadow-md hover:shadow-lg ${
                                    currentPage === page
                                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
                                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400'
                                  }`}
                                >
                                  {page}
                                </button>
                              )
                            } else if (
                              page === currentPage - 2 ||
                              page === currentPage + 2
                            ) {
                              return (
                                <span key={page} className="px-2 text-gray-500 font-semibold">
                                  ...
                                </span>
                              )
                            }
                            return null
                          })}
                        </div>

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-semibold shadow-md hover:shadow-lg"
                        >
                          <span>Next</span>
                          <ChevronRight size={18} />
                        </button>
                      </motion.div>
                    )}
                  </>
                )}
              </div>

              {/* Right Sidebar - Search & Categories */}
              <aside className="lg:w-80 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  
                  {/* Search Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
                  >
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Search</h2>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-800 transition-all shadow-inner"
                      />
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>

                  {/* Categories Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Categories</h2>
                      {categoriesLoading && (
                        <div>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                    {categoriesLoading ? (
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <motion.button
                          onClick={() => handleCategoryClick(null)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            selectedCategory === null
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          <span>All</span>
                          <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                            selectedCategory === null
                              ? 'bg-white/30 text-white'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          }`}>
                            {totalBlogs}
                          </span>
                        </motion.button>
                        {categoriesWithCounts.length > 0 ? (
                          categoriesWithCounts.map((category, index) => (
                            <motion.button
                              key={category.name}
                              onClick={() => handleCategoryClick(category.name)}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 + index * 0.03 }}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                selectedCategory === category.name
                                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                            >
                              <span className="whitespace-nowrap">{category.name}</span>
                              <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${
                                selectedCategory === category.name
                                  ? 'bg-white/30 text-white'
                                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              }`}>
                                {category.count}
                              </span>
                            </motion.button>
                          ))
                        ) : categories.length > 0 ? (
                          // Fallback: show categories without counts if counts failed
                          categories.map((category, index) => (
                            <motion.button
                              key={category}
                              onClick={() => handleCategoryClick(category)}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 + index * 0.03 }}
                              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                                selectedCategory === category
                                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                            >
                              {category}
                            </motion.button>
                          ))
                        ) : (
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-2 w-full">
                            No categories available
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>

                  {/* Recent Posts Panel */}
                  {recentPosts.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
                    >
                      <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                          {currentPage === 1 ? 'Recent Posts' : 'Previous Posts'}
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {recentPosts.map((post, index) => (
                          <Link
                            key={post._id}
                            href={`/blog/${post.slug}`}
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
                                {post.image ? (
                                  <Image
                                    src={post.image}
                                    alt={post.title}
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
                                  {post.title}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {formatDate(post.date)}
                                </p>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </aside>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </motion.main>
    </>
  )
}
