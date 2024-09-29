'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title='炎上という言葉のハードルが下がりすぎている'
      path='my-blow-up-theory'
    >
      <Article />
    </LayoutContent>
  )
}