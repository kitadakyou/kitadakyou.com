import type { Metadata } from 'next'
import Head from 'next/head'
import styles from './index.module.css'
import ContentsTable from './contentsTable'

export const metadata: Metadata = {
  title: 'KITADAKYOU.COM',
  description: '本職とは関係のない文章を書き連ねる先。',
  openGraph: {
    title: 'KITADAKYOU.COM - 北田共の個人サイト',
    url: 'https://kitadakyou.com'
  }
}

export default function Index () {
  return (
    <section className={styles.articles}>
      <Head>
        <title>KITADAKYOU.COM</title>
        <meta property="og:title" content="KITADAKYOU.COM - 北田共の個人サイト" />
        <meta property="og:url" content="https://kitadakyou.com" />
      </Head>
      {// <GenreMenu />
      }
      <ContentsTable />
    </section>
  )
}
