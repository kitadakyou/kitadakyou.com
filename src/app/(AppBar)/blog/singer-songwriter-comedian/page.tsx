'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title='お笑い界だけ"シンガーソングライター"が多すぎる問題'
      path="singer-songwriter-comedian"
    >
      <Article />
    </LayoutContent>
  )
}