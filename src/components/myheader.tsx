import Link from 'next/link'
import styles from '../styles/components/myHeader.module.css'

export default function MyHeader () {
  return (
    <header className={styles.myHeader}>
      <nav>
        <h1 className={styles.headerTitle}>
          <span className={styles.titleFullwidth}><Link href='/'>KITADAKYOU.COM</Link></span>
          <span className={styles.titleSmall}><Link href='/'>K</Link></span>
        </h1>
      </nav>
      <nav className={styles.headerMenu}>
        <Link href='/about'>
          <span>About</span>
        </Link>
      </nav>
    </header>
  )
}
