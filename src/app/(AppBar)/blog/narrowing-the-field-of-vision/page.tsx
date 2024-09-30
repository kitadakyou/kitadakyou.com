'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title='たまには狭い画面で仕事をするのもいい'
      path='narrowing-the-field-of-vision'
    >
      <Article />
    </LayoutContent>
  )
}