import styles from '../styles/page/about.module.css'

export default function About () {
  return (
    <main className={styles.mainContainer}>
      <article className={styles.article}>
        <h1>
          北田共
        </h1>
        <p>1991年 長崎県生まれ。</p>
        <p>「自分は他の人間とは違う」と受験勉強を禄にしないまま高校受験し、周りの人間がほとんど受かった公立校に自分だけ落ちる。</p>
        <p>高校生になってからは人並みの努力をし、最終的に情報工学の修士号を取得。</p>
        <p>エンタメ系IT企業にプログラマーとして就職するが、激務に耐えられず退職しフリーに。</p>
        <p>堅い話が大の苦手なのに医療系ベンチャーの立ち上げに関わったり、体育は2しか取ったことがないのに運動科学系ベンチャーの立ち上げに関わったりする。</p>
        <p>現在、株式会社怪物の代表取締役社長を勤める</p>
      </article>
    </main>
  )
}
