import LayoutContent from '../layoutContent'
import { findContentDataByPath } from 'app/(AppBar)/(Contents)/contents'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    path: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const path = (await params).path
  const metadata = findContentDataByPath(path)

  if (!metadata) {
    return { title: 'Not Found' }
  }

  return {
    title: metadata.title,
    openGraph: {
      images: [{
        url: `/api/og/blog/${path}`,
        width: 1200,
        height: 630,
      }],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const path = (await params).path
  const metadata = findContentDataByPath(path)

  if (!metadata) return null

  const Article = (await import(`articles/${path}.mdx`)).default

  return (
    <LayoutContent 
      title={metadata.title}
      path={path}
    >
      <Article />
    </LayoutContent>
  )
}