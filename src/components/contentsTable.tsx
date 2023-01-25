import React from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/components/contentsTable.module.css'

type ContentApi = {
  path: string,
  title: string,
  date: string,
  genre: 'blog' | 'novel' | 'music' | 'stream'
}

export default function ContentsTable () {
  const router = useRouter()
  const contents: ContentApi[] = [
    {
      path: '/blog/chatgpt-described-pasta-that-does-not-exist',
      title: 'ChatGPTにレシピを訊いたら架空のパスタ「フォルグッティ」を教えられた話',
      date: new Date('2023-1-25').toLocaleDateString('ja-JP'),
      genre: 'blog'
    },
    {
      path: '/blog/review-of-as-internet',
      title: '今さら20年前の本を読んで、個人サイトを作った話',
      date: new Date('2023-1-18').toLocaleDateString('ja-JP'),
      genre: 'blog'
    }

  ]
  const routerPush = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    router.push(event.currentTarget.dataset.path!)
  }
  const genreToJp = (genreName: string) => {
    switch (genreName) {
      case 'blog':
        return 'ブログ'
      case 'novel':
        return '小説'
      case 'music':
        return '音楽'
      case 'stream':
        return '配信'
    }
  }
  const genreTdClassName = (genreName: string) => {
    return styles[`tableData${genreName}`]
  }
  return (
    <section>
      <table className={styles.contentsTable}>
        <thead className={styles.tableHeadRow}>
          <tr>
            <th>日付</th>
            <th>種類</th>
            <th>タイトル</th>
          </tr>
        </thead>
        <tbody>
          {contents.map(c =>
            <tr onClick={routerPush} className={styles.tableBodyRow} key={c.path} data-path={c.path}>
              <td>{c.date}</td>
              <td><span className={`${styles.tableDataGenre} ${genreTdClassName(c.genre)}`}>{genreToJp(c.genre)}</span></td>
              <td>{c.title}</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}
