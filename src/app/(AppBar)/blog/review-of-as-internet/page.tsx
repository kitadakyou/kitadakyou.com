'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title='今さら20年前の本を読んで、個人サイトを作った話'
      path='review-of-as-internet'
    >
      <Article />
    </LayoutContent>
  )
}