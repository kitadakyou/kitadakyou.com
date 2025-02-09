import { contents } from 'app/(AppBar)/(Contents)/contents'
import { notFound } from 'next/navigation'
import { ImageResponse } from '@vercel/og'

// global.css から変数を読み込めないため、同じものを再定義
const GENRE_COLORS = {
  blog: '#009688',
  novel: '#ab47bc',
  music: '#6d4c41',
  article: '#1976d2',
  default: '#000000'
}

export const runtime = 'edge'

export async function GET(
  request: Request,
  { params }: { params: { path: string } }
) {
  const contentData = findContentDataByPath(params.path)

  if (!contentData) {
    return notFound()
  }

  const genre = contentData.genre
  const borderColor = GENRE_COLORS[genre] || GENRE_COLORS.default

  const element = (
    <div
      style={{
        background: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: `20px solid ${borderColor}`,
        padding: '40px',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: 'rgba(0,0,0,0.87)',
            fontSize: '60px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {contentData.title}
        </div>
      </div>
      {contentData.date && (
        <div
          style={{
            color: 'rgba(0,0,0,0.87)',
            fontSize: '36px',
            textAlign: 'right',
            alignSelf: 'flex-end',
            marginTop: 'auto'
          }}
        >
          {contentData.date.toLocaleDateString('ja-JP')}
        </div>
      )}
    </div>
  )

  return new ImageResponse(
    element,
    {
      width: 1200,
      height: 630,
    }
  )
}

function findContentDataByPath(path: string) {
  return contents.find(c => c.path === `/blog/${path}`)
}
