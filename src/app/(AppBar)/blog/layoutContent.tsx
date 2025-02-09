import { ReactNode } from 'react'
import styles from './layoutContent.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { contents } from '../(Contents)/contents'

export default function LayoutContent ({ children, title, path, image }: { children: ReactNode, title: string, path: string, image?: string }) {
  const getOtherContentLink = () => {
    const currentIndex = contents.findIndex(elem => elem.path === `/blog/${path}`)
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
    <main className={styles.main}>
      <article className={styles.article}>
        {children}
      </article>
      <section className={styles.shareSection}>
        <Link href={`https://twitter.com/intent/tweet?text=${title}%20https%3A%2F%2Fkitadakyou.com%2Fblog%2F${path}%20%23北田共のブログ`}><button className={styles.twitterButton}><span><Image src='/img/twitter-icon-white.svg' alt='twitter icon' width={25} height={25} /></span>Twitter(自称 X)でシェアする</button></Link>
      </section>
      <section className={styles.linkSection}>
        { getOtherContentLink() }
      </section>
    </main>
  )
}
