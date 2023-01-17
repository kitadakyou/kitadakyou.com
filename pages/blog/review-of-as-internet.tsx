import Layout from '../../components/layout'
import ArticleOfMarkdown from '../../components/articleOfMarkdown'
import Head from 'next/head'

export default function Content () {
  return (
    <Layout>
      <Head>
        <title>今さら『インターネット的』を読んで、個人サイトを作った話 - KITADAKYOU.COM</title>
      </Head>
      <ArticleOfMarkdown contentPath="/blog/review-of-as-internet.md" />
    </Layout>
  )
}
