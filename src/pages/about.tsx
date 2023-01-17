import Head from 'next/head'
import styles from '../styles/page/about.module.css'

export default function About () {
  return (
    <main className={styles.mainContainer}>
      <Head>
        <title>北田共について - KITADAKYOU.COM</title>
      </Head>
      <article className={styles.article}>
        <h1>北田共</h1>
        <p>1991年 長崎県生まれ。プログラマー</p>
        <p>子供の頃の大事な時期の大半をテレビとインターネットで過ごし、まともな情緒を育むことなく大きくなる。</p>
        <p>15歳の時「自分は他の人間とは違う」と考え、友人全員が受かる中一人だけ公立高校を落ちる。</p>
        <p>その後、人並みに勉強をして、情報工学の修士号を取得。</p>
        <p>新卒でエンタメ系IT企業にプログラマーとして就職するも、激務のために退職してフリーに。</p>
        <p>堅い話が大の苦手なのに、医療系ベンチャーの立ち上げに関わったり、運動を全くやらないのに運動科学系ベンチャーの立ち上げに関わったりする</p>
        <p>現在、株式会社怪物の代表取締役社長</p>
      </article>
    </main>
  )
}
