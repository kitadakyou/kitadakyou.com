import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/components/myFooter.module.css'

export default function MyFooter () {
  return (
    <footer className={styles.footer}>
      <p>
        Copyright © 2023 Kitadakyou All rights reserved.
      </p>
      <Link href='https://github.com/kitadakyou/kitadakyou.com'>
        <Image src='/img/github-mark-white.svg' alt='twitter icon' height={30} width={30} />
      </Link>

    </footer>
  )
}
