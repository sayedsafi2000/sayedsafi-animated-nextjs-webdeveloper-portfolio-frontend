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

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const allProjects = [
  {
    title: 'Musafir Store',
    description: 'Biggest Wholesale shop in South Africa. Modern e-commerce platform with advanced features, real-time inventory management, seamless user experience, and multi-currency support.',
    category: 'E-commerce / Full-Stack',
    image: 'https://res.cloudinary.com/domn2k79e/image/upload/v1765197681/Screenshot_2025-12-08_at_6.36.39_PM_jxncfu.png',
    tags: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'MedusaJS', 'TypeScript'],
    link: 'https://musafir.co.za/',
    github: null,
    featured: true,
    isCustomCode: true,
  },
  {
    title: 'Finders - Art Lane Studio',
    description: 'Creative portfolio and showcase website for an art studio with gallery management, project displays, and client interaction features. Built with modern design tools and custom code.',
    category: 'Web / Creative',
    image: 'https://res.cloudinary.com/domn2k79e/image/upload/v1765197679/Screenshot_2025-12-08_at_6.38.36_PM_gggajs.png',
    tags: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Design Tools'],
    link: 'https://finderscom.artlanestudio.com/',
    github: null,
    isCustomCode: true,
  },
  {
    title: 'PixelsBee',
    description: 'Creative digital agency website with portfolio showcase, service offerings, and client case studies. Modern design with smooth animations and custom functionality.',
    category: 'Web / Creative',
    image: 'https://res.cloudinary.com/domn2k79e/image/upload/v1765198227/Screenshot_2025-12-08_at_6.50.13_PM_sluwjg.png',
    tags: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Design Tools'],
    link: 'https://pixelsbee.com/',
    github: null,
    isCustomCode: true,
  },
  {
    title: 'CBECBD - Multivendor E-commerce',
    description: 'A comprehensive multivendor e-commerce platform with advanced features for vendors and customers. Includes payment integration, order management, vendor dashboard, and analytics.',
    category: 'E-commerce / Full-Stack',
    image: 'https://res.cloudinary.com/domn2k79e/image/upload/v1760981135/Screenshot_95_aiwi1t.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'MERN Stack'],
    link: 'https://cbecbd.org/',
    github: null,
    featured: true,
    isCustomCode: true,
  },
  {
    title: 'GOBangla Academy',
    description: 'Educational platform for learning Bangla language and culture. Features interactive lessons, progress tracking, community features, and certificate generation.',
    category: 'Education / WordPress',
    image: 'https://res.cloudinary.com/domn2k79e/image/upload/v1765197689/Screenshot_2025-12-08_at_6.37.20_PM_oud5hb.png',
    tags: ['WordPress', 'PHP', 'LMS', 'Education'],
    link: 'https://gobanglabnb.com/',
    github: null,
    isCustomCode: false,
  },
  {
    title: 'Supreme Runners',
    description: 'WordPress-based website for a running club with event management, member registration, blog features, and community engagement tools.',
    category: 'WordPress / Business',
    image: 'https://res.cloudinary.com/domn2k79e/image/upload/v1765197713/Screenshot_2025-12-08_at_6.38.01_PM_ftqblk.png',
    tags: ['WordPress', 'PHP', 'Custom Theme', 'WooCommerce'],
    link: 'https://runners.supremestore.org/',
    github: null,
    isCustomCode: false,
  },
  {
    title: 'Ragib Rabeya Degree College',
    description: 'Professional educational institution website with course information, admission system, faculty profiles, and student portal features.',
    category: 'Education / WordPress',
    image: 'https://res.cloudinary.com/domn2k79e/image/upload/v1765197699/Screenshot_2025-12-08_at_6.39.02_PM_ofyjrn.png',
    tags: ['WordPress', 'PHP', 'Education', 'CMS'],
    link: 'https://ragibrabeyadegreecollege.edu.bd/',
    github: null,
    isCustomCode: false,
  },
  {
    title: 'Asad Snapper',
    description: 'Professional business website showcasing services, portfolio, and client testimonials. Built with modern design principles and optimized for performance.',
    category: 'WordPress / Business',
    image: 'https://res.cloudinary.com/domn2k79e/image/upload/v1765197676/Screenshot_2025-12-08_at_6.39.34_PM_phzzvc.png',
    tags: ['WordPress', 'PHP', 'Business', 'Portfolio'],
    link: 'https://asadsnapper.com/',
    github: null,
    isCustomCode: false,
  },
  {
    title: 'Learn With GoBangla',
    description: 'Educational WordPress site for Bangla language learning with course management, student dashboard, and interactive learning features.',
    category: 'WordPress / Education',
    image: 'https://res.cloudinary.com/domn2k79e/image/upload/v1765197678/Screenshot_2025-12-08_at_6.37.02_PM_vwn2tc.png',
    tags: ['WordPress', 'LMS', 'Education', 'PHP'],
    link: 'https://learnwithgobangla.com/',
    github: null,
    isCustomCode: false,
  },
]

// Filter custom code projects first, then WordPress
const customCodeProjects = allProjects.filter(p => p.isCustomCode)
const wordPressProjects = allProjects.filter(p => !p.isCustomCode)

// For home page: Show 3 custom code + 1 WordPress (total 4)
const projects = [
  ...customCodeProjects.slice(0, 3),
  ...wordPressProjects.slice(0, 1),
]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const projectsRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (projectsRef.current) {
      const projectCards = projectsRef.current.querySelectorAll('.project-card')
      projectCards.forEach((card) => {
        (card as HTMLElement).style.opacity = '1'
      })
    }
  }, [])

  const handleGitHubClick = (e: React.MouseEvent, github: string | null) => {
    e.preventDefault()
    if (!github || github === 'null') {
      setIsModalOpen(true)
    } else {
      window.open(github, '_blank')
    }
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

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
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
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/api/placeholder/600/400'
                  }}
                />
                {/* Simplified hover effect - removed heavy particle animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500"
                />
                
                {/* Gradient overlay animation */}
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

                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  {project.tags.map((tag, tagIndex) => (
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

                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.6 }}
                >
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
      </div>
      <GitHubModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

