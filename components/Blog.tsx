'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { blogAPI } from '@/lib/api'

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

export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const response = await blogAPI.getAll({ limit: 6, published: true })
        setBlogPosts(response?.data?.posts || [])
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setBlogPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  if (loading) {
    return (
      <section
        id="blog"
        ref={ref}
        className="py-20 md:py-32 pt-24 md:pt-28 bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="blog"
      ref={ref}
      className="py-20 md:py-32 pt-24 md:pt-28 bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block text-sm text-blue-600 dark:text-blue-400 font-semibold px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            📝 Latest Articles
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            My Blog
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development and technology
          </p>
        </motion.div>

        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No blog posts available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 100, rotateX: -15, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.15, 
                    duration: 0.8, 
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                  }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ 
                    y: -15, 
                    rotateY: 8,
                    rotateX: 5,
                    scale: 1.02,
                    z: 50
                  }}
                  className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all perspective-1000"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={`${post.title} - Web Development Blog by Sayed Safi, MERN Stack Developer`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                      transition={{ delay: index * 0.15 + 0.3 }}
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
                      transition={{ delay: index * 0.15 + 0.4 }}
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
                      transition={{ delay: index * 0.15 + 0.5 }}
                    >
                      {post.title}
                    </motion.h3>

                    <motion.p
                      className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.6 }}
                    >
                      {post.excerpt}
                    </motion.p>

                    {post.tags && post.tags.length > 0 && (
                      <motion.div
                        className="flex flex-wrap gap-2 mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.15 + 0.7 }}
                      >
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <motion.span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            transition={{ delay: index * 0.15 + 0.7 + tagIndex * 0.1, type: 'spring' }}
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
                        transition={{ delay: index * 0.15 + 0.8 }}
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

            {/* View All Button */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View All Posts</span>
                <ArrowRight size={20} />
              </motion.a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
