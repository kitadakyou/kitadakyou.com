import React, { useState } from 'react'
import GenreButton from './genreButton'
import styles from './menu.module.css'

export default function GenreMenu () {
  const [selected, setSelected] = useState('')
  function selectButton (e: string) {
    setSelected(e)
  }
  const buttonInfo = [
    {
      type: 'all',
      text: '全て'
    },
    {
      type: 'blog',
      text: 'ブログ'
    },
    {
      type: 'novel',
      text: '小説'
    },
    {
      type: 'music',
      text: '音楽'
    },
    {
      type: 'stream',
      text: '配信'
    }
  ]

  return (
    <section className={styles.genreSelector}>
      {buttonInfo.map(bi =>
        <GenreButton key={bi.type} text={bi.text} type={bi.type} selected={selected === bi.type} onClick={selectButton} />
      )}
    </section>
  )
}
