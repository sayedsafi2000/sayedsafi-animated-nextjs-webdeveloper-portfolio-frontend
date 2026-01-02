import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sayedsafi.me'
  const now = new Date()
  
  // Fetch dynamic routes from API
  let blogRoutes: MetadataRoute.Sitemap = []
  
  try {
    // Use environment variable only - no hardcoded URLs
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      console.warn('Sitemap: NEXT_PUBLIC_API_URL not set, skipping blog posts')
      return [
        {
          url: baseUrl,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 1.0,
        },
        {
          url: `${baseUrl}/about`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.9,
        },
        {
          url: `${baseUrl}/projects`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.9,
        },
        {
          url: `${baseUrl}/blog`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.9,
        },
        {
          url: `${baseUrl}/experience`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: `${baseUrl}/services`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: `${baseUrl}/testimonials`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.7,
        },
        {
          url: `${baseUrl}/contact`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.8,
        },
      ]
    }
    
    const response = await fetch(`${apiUrl}/blog?published=true&limit=1000`, {
      next: { revalidate: 3600 },
    })
    
    if (response.ok) {
      const data = await response.json()
      const posts = data?.data?.posts || []
      
      blogRoutes = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date || post.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
    }
  } catch (error) {
    console.error('Sitemap: Error fetching blog posts:', error)
  }

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...blogRoutes,
  ]
}

