import styles from './index.module.css'
import ContentsTable from './contentsTable'
import Head from 'next/head'

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
