'use client'
import LayoutContent from '../layoutContent'
import Article from './article.mdx'

export default function Page() {
  return(
    <LayoutContent 
      title='『ファミコン探偵俱楽部 笑み男』の畳み方について二次創作してみた'
      path='fan-fiction-of-emio'
    >
      <Article />
    </LayoutContent>
  )
}