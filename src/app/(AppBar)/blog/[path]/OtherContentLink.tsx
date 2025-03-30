import Link from 'next/link'
import { getCurrentIndex, getContentNum, getPathByIndex } from 'libs/contents'

interface Props {
  slug: string
}

export default function OtherContentLink ({ slug }: Props): React.ReactNode {
  const currentIndex = getCurrentIndex(slug)
  const contetsNum = getContentNum()
  const hasPreviousLink = currentIndex >= 0 && contetsNum - 1 > currentIndex
  const hasNextLink = currentIndex > 0
  return (
    <>
      <div>
        { hasPreviousLink && <Link href={getPathByIndex(currentIndex + 1)}>前の記事へ</Link> }
      </div>
      <div>
        <Link href='/'>一覧へ</Link>
      </div>
      <div>
        { hasNextLink && <Link href={getPathByIndex(currentIndex - 1)}>次の記事へ</Link> }
      </div>
    </>
  )
}
