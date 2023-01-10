import styles from '../styles/components/contentsTable.module.css'

export default function ContentsTable () {
  const contents = [
    {
      id: 'c01',
      date: '2023/1/1',
      title: 'どうしてこの文章を書いているのか'
    },
    {
      id: 'c02',
      date: '2023/1/2',
      title: 'どうしてこの文章を書いているのか'
    }
  ]
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
            <tr className={styles.tableBodyRow} key={c.id}>
              <td>{c.date}</td>
              <td>{c.title}</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}
