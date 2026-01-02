'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const projectsRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        // Fetch projects to get the latest ones
        // Backend sorts by featured first, then order, then createdAt
        // So we fetch more and sort by createdAt on frontend to get truly latest
        const response = await projectsAPI.getAll({ limit: 20 })
        let allProjects = response?.data?.projects || []
        
        // Sort by createdAt (newest first) to get the latest projects
        // Backend returns projects with timestamps, so createdAt should be available
        allProjects = allProjects.sort((a: any, b: any) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA // Newest first
        })
        
        // Get the latest 4 projects (no mixing, just the 4 most recent)
        const latestProjects = allProjects.slice(0, 4)
        
        setProjects(latestProjects)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    if (projectsRef.current) {
      const projectCards = projectsRef.current.querySelectorAll('.project-card')
      projectCards.forEach((card) => {
        (card as HTMLElement).style.opacity = '1'
      })
    }
  }, [projects])

  const handleGitHubClick = (e: React.MouseEvent, github: string | null) => {
    e.preventDefault()
    if (!github || github === 'null') {
      setIsModalOpen(true)
    } else {
      window.open(github, '_blank')
    }
  }

  if (loading) {
    return (
      <section
        id="projects"
        ref={ref}
        className="py-20 md:py-32"
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
      id="projects"
      ref={ref}
      className="py-20 md:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            My Latest Projects
          </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A selection of recent projects showcasing my skills and expertise
              </p>
            </motion.div>
            
            <div className="text-center mb-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                View All Projects
                <ExternalLink size={18} />
              </Link>
            </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No projects available at the moment.</p>
          </div>
        ) : (
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
                key={project._id}
              className="project-card group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 100, rotateX: -15, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{
                delay: index * 0.2,
                duration: 0.8,
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                y: -15,
                rotateY: 8,
                rotateX: 5,
                scale: 1.02,
                z: 50,
                transition: { duration: 0.3 },
              }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {project.image ? (
                <Image
                  src={project.image}
                      alt={`${project.title} - ${project.category} project by Sayed Safi, Full-Stack Web Developer`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                        // Hide image on error instead of using placeholder
                        target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">No Image</span>
                    </div>
                  )}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/20 group-hover:via-purple-600/20 group-hover:to-pink-600/20 transition-all duration-500"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />
              </div>

              <div className="p-6 relative z-10">
                <motion.span
                  className="inline-block text-sm text-blue-600 dark:text-blue-400 font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  {project.category}
                </motion.span>
                <motion.h3
                  className="text-2xl font-bold mt-2 mb-3 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.4 }}
                >
                  {project.description}
                </motion.p>

                  {project.tags && project.tags.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                      {project.tags.slice(0, 4).map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ delay: index * 0.15 + 0.5 + tagIndex * 0.1, type: 'spring' }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
                  )}

                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.6 }}
                >
                    {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
                    whileHover={{ x: 5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <ExternalLink size={18} />
                    </motion.div>
                    <span className="relative">
                      Visit
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover/link:w-full transition-all"
                      />
                    </span>
                  </motion.a>
                    )}
                  <motion.button
                    onClick={(e) => handleGitHubClick(e, project.github)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold hover:text-gray-800 dark:hover:text-gray-200 transition-colors group/link cursor-pointer"
                    whileHover={{ x: 5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, 360] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Github size={18} />
                    </motion.div>
                    <span className="relative">
                      Source Code
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 group-hover/link:w-full transition-all"
                      />
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
      <GitHubModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
