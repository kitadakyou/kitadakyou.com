import Image from 'next/image'
import styles from '../styles/components/myFooter.module.css'

export default function MyFooter () {
  return (
    <footer className={styles.footer}>
      <p>
        Copyright © 2023 Kitadakyou All rights reserved.
      </p>
      <a href='https://github.com/kitadakyou/kitadakyou.com' target="_blank" rel="noopener noreferrer">
        <Image src='/img/github-mark-white.svg' alt='twitter icon' height={30} width={30} />
      </a>

    </footer>
  )
}
