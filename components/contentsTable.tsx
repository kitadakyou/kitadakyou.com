import { useState, useEffect } from 'react'
import { ContentApi } from '../pages/api/contents'
import styles from '../styles/components/contentsTable.module.css'

export default function ContentsTable () {
  const [contents, setContents] = useState<ContentApi[]>([])
  useEffect(() => {
    fetch('/api/contents')
      .then(res => res.json())
      .then(data => {
        setContents(data)
      })
  }, [])
  return (
    <section>
      <table className={styles.contentsTable}>
        <thead className={styles.tableHeadRow}>
          <tr>
            <th>Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {contents.map(c =>
            <tr className={styles.tableBodyRow} key={c.path}>
              <td>{c.date}</td>
              <td>{c.title}</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}
