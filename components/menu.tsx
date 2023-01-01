
import React, { useState } from 'react'
import GenreButton from '../components/genreButton'
import styles from '../styles/components/menu.module.css'

export default function Menu() {
  const [selected, setSelected] = useState("")
  function selectButton(e: any) {
    setSelected(e)
  }
  const buttonInfo = [
    {
      type: "all",
      text: "全て",
    },
    {
      type: "blog",
      text: "ブログ",
    },
    {
      type: "novel",
      text: "小説",
    },
    {
      type: "music",
      text: "音楽",
    },
    {
      type: "stream",
      text: "配信",
    },
  ]

  return (
    <div className={styles.outline}>
      {buttonInfo.map(bi => 
        <GenreButton text={bi.text} type={bi.type} selected={selected === bi.type} onClick={selectButton} />
      )}
    </div>
    )
}
