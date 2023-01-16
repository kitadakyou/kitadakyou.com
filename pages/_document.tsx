import { Html, Head, Main, NextScript } from 'next/document'
import MyHeader from '../components/myheader'
import Script from 'next/script'
import React from 'react'

const GoogleAnalytics = () => {
  const measurementId = 'G-WK4056L7VX'
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
      <Head />
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
