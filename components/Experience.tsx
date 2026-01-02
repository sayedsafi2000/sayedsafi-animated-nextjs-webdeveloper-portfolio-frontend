'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, GraduationCap } from 'lucide-react'

const experiences = [
  {
    type: 'experience',
    title: 'Full Stack Web Developer',
    company: 'Webcoronet IT, Sylhet',
    period: '2024-Present',
    description: 'Currently working as a Full Stack Web Developer at Webcoronet IT. Building scalable web applications using modern technologies.',
  },
  {
    type: 'experience',
    title: 'Wordpress Developer',
    company: 'GoBangla Solution',
    period: '2023-Present',
    description: 'Currently working as a Full Stack Web Developer at GoBangla Solution. Building scalable web applications using modern technologies.',
  },
  {
    type: 'experience',
    title: 'Frontend Web Developer',
    company: 'Opstel IT, Sylhet',
    period: '2023',
    description: 'Built responsive and interactive user interfaces for various clients using React and Next.js.',
  },
  {
    type: 'experience',
    title: 'Network Engineer',
    company: 'CSL IT, Dhaka',
    period: '2022',
    description: 'Managed network infrastructure and provided technical support for enterprise clients.',
  },
]

const education = [
  {
    type: 'education',
    title: 'Bachelor of Computer Science & Engineering',
    company: 'Metropolitan University, Sylhet',
    period: '2022-Present',
    description: 'Pursuing degree in Computer Science and Engineering.',
  },
  {
    type: 'education',
    title: 'Diploma in Computer Science And Technology',
    company: 'Moulvibazar Polytechnic Institute',
    period: '2018-2022',
    description: 'Completed diploma in Computer Science and Technology.',
  },
  {
    type: 'education',
    title: 'Science Background',
    company: 'B.T.R.I High School',
    period: '2017-2018',
    description: 'Completed higher secondary education with science background.',
  },
]

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
        <section
          id="experience"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Education & Experience
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My journey in technology and education
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Experience
              </h3>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{ 
                    delay: index * 0.15, 
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="relative pl-16 pb-8"
                >
                  <motion.div
                    className="absolute left-6 top-2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 z-10"
                    animate={{
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(59, 130, 246, 0.4)',
                        '0 0 0 10px rgba(59, 130, 246, 0)',
                        '0 0 0 0 rgba(59, 130, 246, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                  <motion.div
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group"
                    whileHover={{ y: -5, rotateX: 2 }}
                  >
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1">
                      {exp.period}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h4>
                    <div className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                      {exp.company}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exp.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Education
              </h3>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500" />
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative pl-16 pb-8"
                >
                  <div className="absolute left-6 top-2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white dark:border-gray-800" />
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-1">
                      {edu.period}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {edu.title}
                    </h4>
                    <div className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                      {edu.company}
                    </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {edu.description}
                        </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

