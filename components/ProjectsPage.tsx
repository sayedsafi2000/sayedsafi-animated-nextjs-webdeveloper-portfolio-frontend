'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import GitHubModal from './GitHubModal'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Separate custom code and WordPress projects
const customCodeProjects = [
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
]

const wordPressProjects = [
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

// All projects: Custom code first, then WordPress
const allProjects = [...customCodeProjects, ...wordPressProjects]

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGitHubClick = (e: React.MouseEvent, github: string | null) => {
    e.preventDefault()
    if (!github || github === 'null') {
      setIsModalOpen(true)
    } else {
      window.open(github, '_blank')
    }
  }

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
  }, [])

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

        {/* Custom Code Projects Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Custom Code Projects
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
              (Next.js, React, Node.js, Express, MongoDB, Redis, MedusaJS)
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {customCodeProjects.map((project, index) => (
              <div
                key={project.title}
                className="project-card group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/api/placeholder/600/400'
                    }}
                  />
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

                  <div className="flex gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      <ExternalLink size={18} />
                      Visit
                    </a>
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

        {/* WordPress Projects Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            WordPress Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wordPressProjects.map((project, index) => (
              <div
                key={project.title}
                className="project-card group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
              <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/api/placeholder/600/400'
                  }}
                />
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

                <div className="flex gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    <ExternalLink size={18} />
                    Visit
                  </a>
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
      </div>
      <GitHubModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

