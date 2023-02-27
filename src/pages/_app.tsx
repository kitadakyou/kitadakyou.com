import '../styles/globals.css'
import styles from '../styles/page/_app.module.css'
import type { AppProps } from 'next/app'
import MyHeader from '../components/myheader'
import MyFooter from 'components/myFooter'
import Head from 'next/head'

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="プログラマー兼社長である北田共が本職とは関係のない記事や物語、音楽などを発信するサイトです。" />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="KITADAKYOU.COM" />
      <meta property="og:description" content="プログラマー兼社長である北田共が本職とは関係のない記事や物語、音楽などを発信するサイトです。" />
      <meta name="twitter:card" content="summary" />
    </Head>
      <MyHeader />
      <div className={styles.container}>
        <Component {...pageProps} />
      </div>
      <MyFooter />
    </>
  )
}
