'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title='人間ドックに行ってきた(後編)'
      path="went-to-a-medical-checkup-2"
    >
      <Article />
    </LayoutContent>
  )
}