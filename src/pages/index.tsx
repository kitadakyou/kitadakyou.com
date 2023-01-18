// import GenreMenu from '../components/genreMenu'
import styles from '../styles/components/index.module.css'
import ContentsTable from '../components/contentsTable'
import Head from 'next/head'

export default function Index () {
  return (
    <main className={styles.articles}>
      <Head>
        <title>KITADAKYOU.COM</title>
        <meta name="description" content="北田共による個人サイト。記事や制作物に関する発表など。" />
      </Head>
      {// <GenreMenu />
      }
      <ContentsTable />
    </main>
  )
}