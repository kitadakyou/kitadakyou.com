type ContentApi = {
  path: string,
  title: string,
  date: string,
  genre: 'blog' | 'novel' | 'music' | 'stream'
}

export const contents: ContentApi[] = [
  {
    path: '/blog/singer-songwriter-comedian',
    title: '芸人総シンガーソングライター化現象',
    date: new Date('2023-1-28').toLocaleDateString('ja-JP'),
    genre: 'blog'
  },
  {
    path: '/blog/chatgpt-described-pasta-that-does-not-exist',
    title: 'ChatGPTにレシピを訊いたら架空のパスタ「フォルグッティ」を教えられた話',
    date: new Date('2023-1-25').toLocaleDateString('ja-JP'),
    genre: 'blog'
  },
  {
    path: '/blog/review-of-as-internet',
    title: '今さら20年前の本を読んで、個人サイトを作った話',
    date: new Date('2023-1-18').toLocaleDateString('ja-JP'),
    genre: 'blog'
  }
]
