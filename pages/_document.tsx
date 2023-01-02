import { Html, Head, Main, NextScript } from 'next/document'
import MyHeader from '../components/myheader'

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <div className='container'>
          <MyHeader />
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
