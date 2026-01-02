import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET() {
  try {
    // Use environment variable only - no hardcoded URLs
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      // Return empty RSS feed if API URL not configured
      const baseUrl = 'https://sayedsafi.me'
      const now = new Date().toUTCString()
      const emptyRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sayed Safi - Web Development Blog</title>
    <link>${baseUrl}</link>
    <description>Web development blog posts by Sayed Safi, Full-Stack Web Developer from Bangladesh.</description>
    <language>en-US</language>
    <lastBuildDate>${now}</lastBuildDate>
  </channel>
</rss>`
      return new NextResponse(emptyRss, {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
        },
      })
    }
    
    const response = await fetch(`${apiUrl}/blog?published=true&limit=20`, {
      next: { revalidate: 3600 },
    })
    
    if (!response.ok) {
      return new NextResponse('Error fetching blog posts', { status: 500 })
    }
    
    const data = await response.json()
    const posts = data?.data?.posts || []
    
    const baseUrl = 'https://sayedsafi.me'
    const now = new Date().toUTCString()
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Sayed Safi - Web Development Blog</title>
    <link>${baseUrl}</link>
    <description>Web development blog posts by Sayed Safi, Full-Stack Web Developer from Bangladesh. Learn about MERN Stack, Next.js, React, Node.js, MedusaJS, MongoDB, and WordPress.</description>
    <language>en-US</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/opengraph-image</url>
      <title>Sayed Safi - Web Development Blog</title>
      <link>${baseUrl}</link>
    </image>
    ${posts.map((post: any) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${new Date(post.date || post.createdAt).toUTCString()}</pubDate>
      <author>sayedmdsafiuddin@gmail.com (Sayed Safi)</author>
      <category>${post.category || 'Web Development'}</category>
      ${post.tags?.map((tag: string) => `<category>${tag}</category>`).join('') || ''}
      ${post.image ? `<enclosure url="${post.image}" type="image/jpeg" />` : ''}
    </item>
    `).join('')}
  </channel>
</rss>`
    
    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('RSS Feed Error:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}

