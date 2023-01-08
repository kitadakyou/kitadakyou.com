import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function ContentTemplate(props: any) {
  const [markdown, setMarkdown] = useState("")

  useEffect(() => {
    const getMarkdown = async () => {
      if (markdown !== "") {
        return
      }
      const res = await fetch('/blog/test.md')
      setMarkdown(await res.text())
    }
    getMarkdown()
  })

  return (
    <div>
      <ReactMarkdown children={markdown} />
    </div>
  )
}
