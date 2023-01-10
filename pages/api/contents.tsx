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
      path: 'blog/test.md',
      title: 'test title 1',
      date: new Date('2023-1-1').toLocaleDateString('ja-JP'),
      genre: 'blog'
    },
    {
      path: 'blog/test.md',
      title: 'test title 2',
      date: new Date('2023-1-10').toLocaleDateString('ja-JP'),
      genre: 'blog'
    },
    {
      path: 'blog/test.md',
      title: 'test title 3',
      date: new Date('2023-1-15').toLocaleDateString('ja-JP'),
      genre: 'novel'
    }
  ]

  res.json(contents)
}
