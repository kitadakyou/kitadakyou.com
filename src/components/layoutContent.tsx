import { ReactNode } from 'react'
import styles from '../styles/components/layoutContent.module.css'

export default function LayoutContent ({ children }: { children: ReactNode }) {
  return (
    <main className={styles.main}>
      <article className={styles.article}>
        {children}
      </article>
    </main>
  )
}
