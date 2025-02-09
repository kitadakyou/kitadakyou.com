import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.css'

interface Props {
  title: string,
  slug: string
}

export default function SnsShareLinks ({ title, slug }: Props): React.ReactNode {
  return (
    <Link href={`https://twitter.com/intent/tweet?text=${title}%20https%3A%2F%2Fkitadakyou.com%2Fblog%2F${slug}%20%23北田共のブログ`} target='_blank'>
      <button className={styles.twitterButton}>
        <span>
          <Image src='/img/twitter-icon-white.svg' alt='twitter icon' width={25} height={25} />
        </span>Twitter(自称 X)でシェアする
      </button>
    </Link>
  )
}
