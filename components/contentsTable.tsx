import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ContentApi } from '../pages/api/contents'
import styles from '../styles/components/contentsTable.module.css'

export default function ContentsTable () {
  const router = useRouter()
  const [contents, setContents] = useState<ContentApi[]>([])
  useEffect(() => {
    fetch('/api/contents')
      .then(res => res.json())
      .then(data => {
        setContents(data)
      })
  }, [])
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
            <th>ジャンル</th>
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
