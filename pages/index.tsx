import GenreMenu from '../components/genreMenu'
import styles from '../styles/components/index.module.css'
import ContentsTable from '../components/contentsTable'

export default function Index() {
  return (
    <main className={styles.articles}>
      <GenreMenu />
      <ContentsTable />
    </main>
    )
}
