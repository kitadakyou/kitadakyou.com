/** @type {import('next').NextConfig} */
import withMDXModule from '@next/mdx'
const withMDX = withMDXModule({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
})

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  distDir: './.next'
}

export default withMDX(nextConfig)
