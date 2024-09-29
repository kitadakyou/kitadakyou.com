'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title='副作用に「悪夢」と書いてある薬を飲んだら、ちゃんと悪夢を見た話'
      path='the-drug-that-said-nightmares-as-side-effect'
    >
      <Article />
    </LayoutContent>
  )
}