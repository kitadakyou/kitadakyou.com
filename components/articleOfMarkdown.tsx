import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

type Props = {
  contentPath: string
}

export default function ArticleOfMarkdown (props: Props) {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const getMarkdown = async () => {
      const res = await fetch(props.contentPath)
      setMarkdown(await res.text())
    }
    getMarkdown()
  }, [])

  return (
    <article>
      <ReactMarkdown children={markdown} />
    </article>
  )
}