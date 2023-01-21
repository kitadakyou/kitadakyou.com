import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MyHeader from '../components/myheader'
import MyFooter from 'components/myFooter'

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <>
      <MyHeader />
      <Component {...pageProps} />
      <MyFooter />
    </>
  )
}
