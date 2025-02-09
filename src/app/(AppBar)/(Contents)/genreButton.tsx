import styles from './genreButton.module.css'

type Props = {
  text: string,
  type: string,
  selected?: boolean,
  onClick: (type: string) => void
}

export default function GenreButton (props: Props) {
  const getClassName = (): string => {
    if (props.type === 'all') {
      return styles.allButton
    } else if (props.type === 'blog') {
      return styles.blogButton
    } else if (props.type === 'novel') {
      return styles.novelButton
    } else if (props.type === 'music') {
      return styles.musicButton
    } else if (props.type === 'stream') {
      return styles.streamButton
    }
    return ''
  }

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const button = e.target as HTMLButtonElement
    props.onClick(button.dataset.type ?? '')
  }

  return (
    <button
      className={`${styles.button} ${getClassName()}`}
      data-is-selected={props.selected}
      onClick={clickHandler}
      data-type={props.type}
    >
      {props.text}
    </button>
  )
}
