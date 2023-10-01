type ContentApi = {
  path: string,
  title: string,
  date: string,
  genre: 'blog' | 'novel' | 'music' | 'stream'
}

export const contents: ContentApi[] = [
//  {
//    path: '/blog/i-want-netflix-real-store',
//    title: 'Netflixの実店舗が欲しい',
//    date: new Date('2023-2-10').toLocaleDateString('ja-JP'),
//    genre: 'blog'
//  },
  {
    path: '/blog/how-to-create-games-for-an-age-of-entertainment',
    title: 'ピクミン4とタイパ時代のゲーム作り',
    date: new Date('2023-10-01').toLocaleDateString('ja-JP'),
    genre: 'blog'
  },
  {
    path: '/blog/nhk-programs-are-so-unique-compare-to-commercial-broadcasts',
    title: 'NHK番組の異質さ',
    date: new Date('2023-9-15').toLocaleDateString('ja-JP'),
    genre: 'blog'
  },
  {
    path: '/blog/my-blow-up-theory',
    title: '炎上という言葉のハードルが下がりすぎている',
    date: new Date('2023-2-28').toLocaleDateString('ja-JP'),
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
