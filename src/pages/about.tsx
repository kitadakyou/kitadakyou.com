import Head from 'next/head'
import styles from '../styles/page/about.module.css'
import Image from 'next/image'

export default function About () {
  return (
    <section className={styles.mainContainer}>
      <Head>
        <title>北田共について - KITADAKYOU.COM</title>
        <meta property="og:title" content="著者来歴" />
        <meta property="og:url" content="https://kitadakyou.com/about" />
      </Head>
      <article className={styles.article}>
        <h1>北田共</h1>
        <h2>来歴</h2>
        <p>1991年 長崎県生まれ。プログラマー</p>
        <p>子供の頃の大事な時期の大半をテレビとインターネットで過ごし、まともな情緒を育むことなく大きくなる。</p>
        <p>15歳の時「自分は他の人間とは違う」と考え、友人全員が受かる中一人だけ公立高校を落ちる。</p>
        <p>その後、自分の立場を弁えて人並み以上の勉強をし、なんとか大卒の称号を獲得。</p>
        <p>エンタメ系IT企業にプログラマーとして就職するも、激務のために退職。フリーに。</p>
        <p>堅い話が大の苦手なのに、医療系ベンチャーの立ち上げに関わったり、運動を全くやらないのに運動科学系ベンチャーの立ち上げに関わったりする。</p>
        {/* <p>現在、株式会社怪物の代表取締役社長。</p> */}
      </article>
      <section className={styles.linkSection}>
        <h2>リンク</h2>
        <div className={styles.linkButtons}>
          <a href='https://twitter.com/kitadakyou_n' target="_blank" rel="noopener noreferrer">
            <button className={styles.twitterButton}>
              <span><Image src='/img/twitter-icon.svg' alt='twitter icon' width={25} height={25} /></span>Twitter
            </button>
          </a>
          <a href='mailto:kitadakyou@kitadakyou.com'>
            <button className={styles.emailButton}>
              <span><Image src='/img/email.svg' alt='email icon' width={23} height={23} /></span>メール
            </button>
          </a>
        </div>
      </section>
    </section>
  )
}
