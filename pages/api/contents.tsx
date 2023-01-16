import type { NextApiRequest, NextApiResponse } from 'next'

export type ContentApi = {
  path: string,
  title: string,
  date: string,
  genre: 'blog' | 'novel' | 'music' | 'stream'
}

export default function Contents (req: NextApiRequest, res: NextApiResponse) {
  const contents: ContentApi[] = [
    {
      path: '/blog/review-of-as-internet',
      title: '今さら『インターネット的』を読んで、今さら個人サイトを作った話',
      date: new Date('2023-1-18').toLocaleDateString('ja-JP'),
      genre: 'blog'
    }
  ]

  res.json(contents)
}
