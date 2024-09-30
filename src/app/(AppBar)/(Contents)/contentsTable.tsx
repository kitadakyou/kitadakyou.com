'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './contentsTable.module.css'
import { contents } from 'app/(AppBar)/(Contents)/contents'

export default function ContentsTable () {
  const router = useRouter()
  const routerPush = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    router.push(event.currentTarget.dataset.path!)
  }
  const genreToJp = (genreName: string) => {
    switch (genreName) {
      case 'blog':
        return '雑記'
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
              <td>{c.date.toLocaleDateString('ja-JP')}</td>
              <td><span className={`${styles.tableDataGenre} ${genreTdClassName(c.genre)}`}>{genreToJp(c.genre)}</span></td>
              <td>{c.title}</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}
