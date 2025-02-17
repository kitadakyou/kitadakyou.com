import MyHeader from './myheader'
import MyFooter from './myFooter'
import '../globals.css'

export default function RootLayout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link href="/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="twitter:card" content="summary" />
      </head>
      <body>
        <MyHeader />
        <div className="container">
          <main>{children}</main>
        </div>
        <MyFooter />
      </body>
    </html>
  )
}
