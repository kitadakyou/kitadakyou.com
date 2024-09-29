'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title='人間ドックに行ってきた(前編)'
      path="went-to-a-medical-checkup-1"
    >
      <Article />
    </LayoutContent>
  )
}