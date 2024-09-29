'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title="ChatGPTにレシピを訊いたら架空のパスタ「フォルグッティ」を教えられた話"
      path="chatgpt-described-pasta-that-does-not-exist"
    >
      <Article />
    </LayoutContent>
  )
}