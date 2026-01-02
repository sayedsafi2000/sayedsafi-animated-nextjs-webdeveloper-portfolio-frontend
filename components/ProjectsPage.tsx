'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import GitHubModal from './GitHubModal'
import { projectsAPI } from '@/lib/api'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

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
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await projectsAPI.getAll()
        setProjects(response.data.projects || [])
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleGitHubClick = (e: React.MouseEvent, github: string | null) => {
    e.preventDefault()
    if (!github || github === 'null') {
      setIsModalOpen(true)
    } else {
      window.open(github, '_blank')
    }
  }

  // Separate projects by type
  const customCodeProjects = projects.filter(p => p.isCustomCode)
  const wordPressProjects = projects.filter(p => !p.isCustomCode)

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }
    )

    // Project cards animation
    const cards = containerRef.current.querySelectorAll('.project-card')
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 100,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [projects])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>

        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          All Projects
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-12">
          A comprehensive collection of my web development projects
        </p>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No projects available at the moment.</p>
          </div>
        ) : (
          <div ref={containerRef}>
            {/* Custom Code Projects Section */}
            {customCodeProjects.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                  Custom Code Projects
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                    (Next.js, React, Node.js, Express, MongoDB, Redis, MedusaJS)
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {customCodeProjects.map((project) => (
                    <div
                      key={project._id}
                      className="project-card group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                    >
                      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={`${project.title} - ${project.category} project by Sayed Safi, MERN Stack Developer`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              // Hide image on error instead of using placeholder
                              target.style.display = 'none'
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                        {project.featured && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold z-10">
                            Featured
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {project.category}
                        </span>
                        <h3 className="text-2xl font-bold mt-2 mb-3 text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-4">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                            >
                              <ExternalLink size={18} />
                              Visit
                            </a>
                          )}
                          <button
                            onClick={(e) => handleGitHubClick(e, project.github)}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold hover:underline cursor-pointer"
                          >
                            <Github size={18} />
                            Source
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WordPress Projects Section */}
            {wordPressProjects.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                  WordPress Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {wordPressProjects.map((project) => (
                    <div
                      key={project._id}
                      className="project-card group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                    >
                      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={`${project.title} - ${project.category} project by Sayed Safi, MERN Stack Developer`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              // Hide image on error instead of using placeholder
                              target.style.display = 'none'
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {project.category}
                        </span>
                        <h3 className="text-2xl font-bold mt-2 mb-3 text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-4">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                            >
                              <ExternalLink size={18} />
                              Visit
                            </a>
                          )}
                          <button
                            onClick={(e) => handleGitHubClick(e, project.github)}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold hover:underline cursor-pointer"
                          >
                            <Github size={18} />
                            Source
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <GitHubModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
