import * as fs from 'fs'
import { contents } from '../src/libs/contents.ts'

const contentUrls = contents.map((c) => {
  const toW3cDatetime = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  }
  return `<url>
  <loc>https://kitadakyou.com${c.path}</loc>
  <lastmod>${toW3cDatetime(new Date(c.date))}</lastmod>
</url>
`
}
).reduce((acc, current) => current + acc)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
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
`

fs.writeFile('./public/sitemap.xml', sitemap, err => {
  if (err) {
    console.error(err)
  }
})
