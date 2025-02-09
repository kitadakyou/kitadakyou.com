import { Metadata } from 'next'
import { findContentDataByPath } from 'app/(AppBar)/(Contents)/contents'
import OtherContentLink from './OtherContentLink'
import SnsShareLinks from './SnsShareLinks'
import styles from './styles.module.css'

interface PageProps {
  params: Promise<{
    path: string
  }>
}

export async function generateMetadata ({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).path
  const metadata = findContentDataByPath(slug)

  if (!metadata) {
    return { title: 'Not Found' }
  }

  return {
    title: metadata.title,
    openGraph: {
      images: [{
        url: `/api/og/blog/${slug}`,
        width: 1200,
        height: 630
      }]
    }
  }
}

export default async function Page ({ params }: PageProps) {
  const slug = (await params).path
  const metadata = findContentDataByPath(slug)

  if (!metadata) return null

  const Article = (await import(`articles/${slug}.mdx`)).default

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <Article />
      </article>
      <section className={styles.shareSection}>
        <SnsShareLinks title={metadata.title} slug={slug} />
      </section>
      <section className={styles.linkSection}>
        <OtherContentLink slug={slug} />
      </section>
    </main>
  )
}
