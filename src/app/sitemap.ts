import type { MetadataRoute } from 'next'
import { contents } from '../libs/contents'

export default function sitemap (): MetadataRoute.Sitemap {
  const blogs = contents.map(content => ({
    url: `https://kitadakyou.com/blog${content.path}`,
    lastModified: content.date,
    changeFrequency: 'never' as const,
    priority: 1
  }))
  const staticPages = [
    {
      url: 'https://kitadakyou.com',
      lastModified: contents[0].date,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: 'https://kitadakyou.com/about',
      lastModified: new Date(2023, 1, 18),
      changeFrequency: 'yearly' as const,
      priority: 0.5
    }
  ]
  const result = [...blogs, ...staticPages]
  return result
}
