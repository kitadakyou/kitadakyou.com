'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title='ピクミン4とタイパ時代のゲーム作り'
      path='how-to-create-games-for-an-age-of-entertainment'
    >
      <Article />
    </LayoutContent>
  )
}