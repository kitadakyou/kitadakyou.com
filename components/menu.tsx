
import React, { useState } from 'react'
import GenreButton from '../components/genreButton'
import styles from '../styles/components/menu.module.css'

export default function Menu() {
  const [selected, setSelected] = useState("")
  function selectButton(e: any) {
    console.log(e)
    setSelected(e)
  }

  return (
    <div className={styles.outline}>
      <GenreButton type="all" selected={selected === "all"} onClick={selectButton} />
      <GenreButton type="text" selected={selected === "text"} onClick={selectButton} />
      <GenreButton type="novel" selected={selected === "novel"} onClick={selectButton} />
    </div>
    )
}
