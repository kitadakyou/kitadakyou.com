import * as fs from 'fs'
import pkg from '../src/libs/contents.ts'
const { contents } = pkg

const contentUrls = contents.map((c) => {
  const toW3cDatetime = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }
  return `<url>
  <loc>https://kitadakyou.com${c.path}</loc>
  <lastmod>${toW3cDatetime(new Date(c.date))}</lastmod>
</url>`
})

const sitemap = `<xml version="1.0" encoding="UTF-8">
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kitadakyou.com</loc>
    <lastmod>2023-01-18</lastmod>
  </url>
  <url>
    <loc>https://kitadakyou.com/about</loc>
    <lastmod>2023-01-18</lastmod>
  </url>
  ${contentUrls}
</urlset>
</xml>
`

fs.writeFile('./public/sitemap.xml', sitemap, err => {
  if (err) {
    console.error(err)
  }
})
