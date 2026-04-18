'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowLeft, Calendar, Tag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import SmoothScroll from '@/components/SmoothScroll'
import FloatingElements from '@/components/FloatingElements'
import GitHubModal from '@/components/GitHubModal'
import { projectsAPI } from '@/lib/api'

interface Project {
  _id: string
  title: string
  description: string
  category: string
  image: string
  tags: string[]
  link: string
  github: string | null
  featured: boolean
  isCustomCode: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectsAPI.getById(params.id as string)
        setProject(response.data.project)
      } catch (error) {
        console.error('Error fetching project:', error)
        router.push('/projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id, router])

  const handleGitHubClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!project?.github || project.github === 'null') {
      setIsModalOpen(true)
    } else {
      window.open(project.github, '_blank')
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    )
  }

  if (!project) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project not found</h1>
            <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">
              Back to Projects
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <ScrollProgress />
      <SmoothScroll />
      <FloatingElements />
      
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-20">
        <div className="w-full px-2 sm:px-4 lg:px-6 py-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-4"
            >
              <ArrowLeft size={18} />
              <span>Back to Projects</span>
            </Link>
          </motion.div>

          {/* Split Screen Layout - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 xl:grid-cols-5 gap-4 h-[calc(100vh-160px)]"
          >
            {/* Left Side - Website Preview - Takes 3/5 width */}
            <div className="xl:col-span-3 relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
              {/* Browser Chrome */}
              <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 flex-shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-1.5 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <ExternalLink size={14} />
                    <span className="truncate">{project.link || 'No website link'}</span>
                  </div>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink size={16} className="text-gray-600 dark:text-gray-300" />
                  </a>
                )}
              </div>
              
              {/* Website iframe - Desktop View */}
              <div className="flex-1 bg-white min-h-0 relative overflow-hidden">
                {project.link ? (
                  <iframe
                    src={project.link}
                    className="w-full h-full border-0"
                    title={`${project.title} website`}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    loading="lazy"
                    scrolling="yes"
                    frameBorder="0"
                    style={{ 
                      transform: 'scale(0.6)', 
                      transformOrigin: 'top left',
                      width: '166.67%',
                      height: '166.67%',
                      display: 'block',
                      overflow: 'hidden'
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                    <div className="text-center">
                      <ExternalLink size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No website link available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Project Details - Takes 2/5 width */}
            <div className="xl:col-span-2 overflow-y-auto lg:pr-2 custom-scrollbar">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 lg:p-6 shadow-lg">
                {/* Project Title & Category */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                      {project.category}
                    </span>
                    {!project.isCustomCode && (
                      <span className="px-4 py-1.5 bg-gradient-to-r from-green-600 to-teal-600 text-white text-sm font-semibold rounded-full">
                        WordPress
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {project.title}
                  </h1>

                  <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>
                        {new Date(project.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-6">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all"
                    >
                      <ExternalLink size={18} />
                      <span>Visit Website</span>
                    </a>
                  )}
                  {project.github && (
                    <button
                      onClick={handleGitHubClick}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold rounded-full hover:opacity-90 transition-all"
                    >
                      <Github size={18} />
                      <span>Source Code</span>
                    </button>
                  )}
                </div>

                {/* Description */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Project Overview
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Tag size={18} />
                      <span>Technologies Used</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Project Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{project.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Project Type</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {project.isCustomCode ? 'Custom Code' : 'WordPress'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Featured</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {project.featured ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Updated</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(project.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <GitHubModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
