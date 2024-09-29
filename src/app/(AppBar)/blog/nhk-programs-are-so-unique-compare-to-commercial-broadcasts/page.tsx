'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title='NHK番組の異質さ'
      path='nhk-programs-are-so-unique-compare-to-commercial-broadcasts'
    >
      <Article />
    </LayoutContent>
  )
}