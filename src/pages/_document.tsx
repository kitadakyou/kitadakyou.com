import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang="ja">
      <Head>
        <link href="/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      </Head>
      <body>
        <div className='container'>
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
