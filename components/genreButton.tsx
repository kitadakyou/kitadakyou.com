import styles from '../styles/components/genreButton.module.css'

type Props = {
  type: string,
  selected?: boolean,
  onClick: any
}

export default function GenreButton(props: Props) {
  const getClassName =  (): string => {
    if (props.type == 'all') {
      return styles.allButton
    } else if(props.type == 'text') {
      return styles.textButton
    } else if(props.type == 'novel') {
      return styles.novelButton
    }
    return ''
  }

  const getText =  (): string => {
    if (props.type == 'all') {
      return '全て'
    } else if(props.type == 'text') {
      return 'エッセイ'
    } else if(props.type == 'novel') {
      return '小説'
    }
    return ''
  }

  const clickHandler = (e: any): void => {    
    props.onClick(e.target.dataset.type)
  }

  return (
    <button
      className={`${styles.button} ${getClassName()}`}
      data-is-selected={props.selected}
      onClick={clickHandler}
      data-type={props.type}
    >
        {getText()}
        {props.selected}
    </button>
  )
}
