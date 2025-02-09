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
        url: `/api/og/${path}`,
        width: 1200,
        height: 630,
      }],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const path = (await params).path
  const metadata = findContentDataByPath(path)

  console.log('metadata', metadata)

  if (!metadata) return null

  const Article = (await import(`./${path}.mdx`)).default
  console.log('Article', Article)
  return (
    <LayoutContent 
      title={metadata.title}
      path={path}
    >
      <Article />
    </LayoutContent>
  )
}