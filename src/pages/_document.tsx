import { Html, Head, Main, NextScript } from 'next/document'
import MyHeader from '../components/myheader'
import Script from 'next/script'
import React from 'react'

const GoogleAnalytics = () => {
  const measurementId = 'G-973LF1LC2Q'
  if (process.env.NODE_ENV === 'production') {
    return (
        <React.Fragment>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
        
              gtag('config', '${measurementId}');
            `}
          </Script>
      </React.Fragment>
    )
  }
}

export default function Document () {
  return (
    <Html lang="ja">
      <Head>
        <link href="/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      </Head>
      <body>
        <div className='container'>
          <MyHeader />
          <Main />
        </div>
        { GoogleAnalytics() }
        <NextScript />
      </body>
    </Html>
  )
}
