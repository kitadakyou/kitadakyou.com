type ContentApi = {
  path: string,
  title: string,
  date: Date,
  genre: 'blog' | 'novel' | 'music' | 'article'
}

export const contents: ContentApi[] = [
  {
    path: '/blog/beat-the-cold',
    title: '寒さに打ち勝ちたい',
    date: new Date('2025-02-16'),
    genre: 'blog'
  },
  {
    path: '/blog/giver-media-or-taker-media',
    title: '吸い取るメディアと与えられるメディア',
    date: new Date('2025-02-11'),
    genre: 'article'
  },
  {
    path: '/blog/oat-milk-coffee',
    title: 'オーツミルクコーヒー',
    date: new Date('2025-02-08'),
    genre: 'blog'
  }, {
    path: '/blog/narrowing-the-field-of-vision',
    title: 'たまには狭い画面で仕事をするのもいい',
    date: new Date('2024-9-30'),
    genre: 'article'
  },
  {
    path: '/blog/fan-fiction-of-emio',
    title: '『ファミコン探偵俱楽部 笑み男』の畳み方について二次創作してみた',
    date: new Date('2024-9-08'),
    genre: 'article'
  },
  {
    path: '/blog/went-to-a-medical-checkup-2',
    title: '人間ドックに行ってきた話(後編)',
    date: new Date('2024-8-12'),
    genre: 'blog'
  },
  {
    path: '/blog/went-to-a-medical-checkup-1',
    title: '人間ドックに行ってきた話(前編)',
    date: new Date('2024-8-11'),
    genre: 'blog'
  },
  {
    path: '/blog/afterwards-of-in-the-rain',
    title: 'あとがき 『イン・ザ・レイン』',
    date: new Date('2024-5-14'),
    genre: 'novel'
  },
  {
    path: '/blog/the-drug-that-said-nightmares-as-side-effect',
    title: '副作用に「悪夢」と書いてある薬を飲んだら、ちゃんと悪夢を見た話',
    date: new Date('2024-4-28'),
    genre: 'blog'
  },
  {
    path: '/blog/how-to-create-games-for-an-age-of-entertainment',
    title: 'ピクミン4とタイパ時代のゲーム作り',
    date: new Date('2023-10-01'),
    genre: 'article'
  },
  {
    path: '/blog/nhk-programs-are-so-unique-compare-to-commercial-broadcasts',
    title: 'NHK番組の異質さ',
    date: new Date('2023-9-15'),
    genre: 'article'
  },
  {
    path: '/blog/my-blow-up-theory',
    title: '炎上という言葉のハードルが下がりすぎている',
    date: new Date('2023-2-28'),
    genre: 'article'
  },
  {
    path: '/blog/80s-jrpg-hero-always-forced-make-his-own-desicion',
    title: '80年代のRPGは自発的な行動を求められる',
    date: new Date('2023-2-1'),
    genre: 'article'
  },
  {
    path: '/blog/singer-songwriter-comedian',
    title: '芸人総シンガーソングライター化現象',
    date: new Date('2023-1-28'),
    genre: 'article'
  },
  {
    path: '/blog/chatgpt-described-pasta-that-does-not-exist',
    title: 'ChatGPTにレシピを訊いたら架空のパスタ「フォルグッティ」を教えられた話',
    date: new Date('2023-1-25'),
    genre: 'article'
  },
  {
    path: '/blog/review-of-as-internet',
    title: '今さら20年前の本を読んで、個人サイトを作った話',
    date: new Date('2023-1-18'),
    genre: 'article'
  }
]

export function findContentDataByPath (slug: string) {
  return contents.find(c => c.path === `/blog/${slug}`)
}

export function getCurrentIndex (slug: string) {
  return contents.findIndex(elem => elem.path === `/blog/${slug}`)
}

export function getContentNum () {
  return contents.length
}

export function getPathByIndex (index: number) {
  return contents[index].path
}
