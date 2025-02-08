'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title='オーツミルクコーヒー'
      path='oat-milk-coffee'
    >
      <Article />
    </LayoutContent>
  )
}
