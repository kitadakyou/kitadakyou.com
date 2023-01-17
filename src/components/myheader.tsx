import Link from 'next/link'

export default function MyHeader () {
  return (
    <header className="myHeader">
      <nav>
        <h1 className="headerTitle">
          <Link href='/'>KITADAKYOU.COM</Link>
        </h1>
      </nav>
      <nav className='headerMenu'>
        <Link href='/about'>
          <span>About</span>
        </Link>
      </nav>
    </header>
  )
}
