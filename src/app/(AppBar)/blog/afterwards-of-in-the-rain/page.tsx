'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title='『イン・ザ・レイン』というお話を書きました'
      path='afterwards-of-in-the-rain'
    >
      <Article />
    </LayoutContent>
  )
}