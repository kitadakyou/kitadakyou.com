import { ReactNode } from 'react'
import styles from '../styles/components/layoutContent.module.css'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { contents } from './contentsTable'

export default function LayoutContent ({ children, title, path, image }: { children: ReactNode, title: string, path: string, image?: string }) {
  const getOtherContentLink = () => {
    const currentIndex = contents.findIndex(elem => elem.path === `/${elem.genre}/${path}`)
    const hasPreviousLink = currentIndex >= 0 && contents.length - 1 > currentIndex
    const hasNextLink = currentIndex > 0
    return (
      <>
        <div>
          { hasPreviousLink && <Link href={`${contents[currentIndex + 1].path}`}>前の記事へ</Link> }
        </div>
        <div>
          <Link href='/'>目次</Link>
        </div>
        <div>
        { hasNextLink && <Link href={`${contents[currentIndex - 1].path}`}>次の記事へ</Link> }
        </div>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>{`${title} - KITADAKYOU.COM`}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`https://kitadakyou.com/blog/${path}`} />
        { image ? <meta property="og:image" content={image} /> : ''}
      </Head>
      <main className={styles.main}>
        <article className={styles.article}>
          {children}
        </article>
        <section className={styles.shareSection}>
          <Link href={`https://twitter.com/intent/tweet?text=${title}%20https%3A%2F%2Fkitadakyou.com%2Fblog%2F${path}%20%23北田共のブログ`}><button className={styles.twitterButton}><span><Image src='/img/twitter-icon-white.svg' alt='twitter icon' width={25} height={25} /></span>Twitterでシェアする</button></Link>
        </section>
        <section className={styles.linkSection}>
          { getOtherContentLink() }
        </section>
      </main>
    </>
  )
}
