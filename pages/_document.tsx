import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body className='bg-slate-900 text-slate-200'>
        <div className='container mx-auto'>
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
