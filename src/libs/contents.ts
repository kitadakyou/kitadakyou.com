type ContentApi = {
  path: string,
  title: string,
  date: string,
  genre: 'blog' | 'novel' | 'music' | 'stream'
}

export const contents: ContentApi[] = [
  {
    path: '/blog/digital-go-jp-uses-nextjs',
    title: 'デジタル庁がNuxt.jsからNext.jsに乗り替えている件について',
    date: new Date('2023-2-8').toLocaleDateString('ja-JP'),
    genre: 'blog'
  },
  {
    path: '/blog/80s-jrpg-hero-always-forced-make-his-own-desicion',
    title: '80年代のRPGは自発的な行動を求められる',
    date: new Date('2023-2-1').toLocaleDateString('ja-JP'),
    genre: 'blog'
  },
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
