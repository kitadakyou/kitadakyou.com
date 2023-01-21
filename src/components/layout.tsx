import MyHeader from '../components/myheader'
import MyFooter from 'components/myFooter'
import { ReactNode } from 'react'
// import styles from '../styles/components/layout.module.css'

export default function Layout ({ children }: { children: ReactNode }) {
  return (
    <>
      <MyHeader />
        {children}
      <MyFooter />
    </>
  )
}
