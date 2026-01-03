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
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

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

export default function BlogPage() {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const postsPerPage = 6

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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const response = await blogAPI.getAll({ 
          limit: postsPerPage, 
          page: currentPage,
          published: true 
        })
        setBlogPosts(response.data.posts || [])
        setTotalPages(response.data.pagination?.totalPages || 1)
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setBlogPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [currentPage])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <>
      {isInitialLoad && <LoadingScreen />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{ willChange: 'opacity' }}
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 relative"
      >
        <StructuredData />
        <ScrollProgress />
        <SmoothScroll />
        <FloatingElements />
        <Header />
        
        <section className="py-20 md:py-32 pt-24 md:pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <motion.span
                className="inline-block text-sm text-blue-600 dark:text-blue-400 font-semibold px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                📝 All Articles
              </motion.span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                My Blog
              </h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Thoughts, tutorials, and insights about web development and technology
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No blog posts available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post._id}
                    style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: 'tween'
                    }}
                    viewport={{ once: true, margin: '-50px' }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { 
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    }}
                    className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      ) : (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80 group-hover:from-blue-500/90 group-hover:to-purple-500/90 transition-all"
                          whileHover={{ scale: 1.1 }}
                        />
                      )}
                      <motion.div
                        className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                          className="text-white text-xl font-bold"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {post.category}
                        </motion.span>
                      </div>
                      
                      {/* Category Badge */}
                      <motion.div
                        className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <span className="text-white text-xs font-semibold">{post.category}</span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <motion.div
                        className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </motion.div>

                      <motion.h3
                        className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {post.title}
                      </motion.h3>

                      <motion.p
                        className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        {post.excerpt}
                      </motion.p>

                      {post.tags && post.tags.length > 0 && (
                        <motion.div
                          className="flex flex-wrap gap-2 mb-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.7 }}
                        >
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <motion.span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              transition={{ delay: index * 0.1 + 0.7 + tagIndex * 0.1, type: 'spring' }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
                      >
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ delay: index * 0.1 + 0.8 }}
                        >
                          Read More
                        </motion.span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <ArrowRight size={18} />
                        </motion.div>
                        <motion.span
                          className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover/link:w-full transition-all"
                        />
                      </Link>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all pointer-events-none rounded-2xl"
                      initial={false}
                    />
                  </motion.article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && blogPosts.length > 0 && totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center items-center gap-2 mt-12"
              >
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <ChevronLeft size={18} />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
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
                        <span key={page} className="px-2 text-gray-500">
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
                  className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <span>Next</span>
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            )}
          </div>
        </section>
        
        <Footer />
      </motion.main>
    </>
  )
}
