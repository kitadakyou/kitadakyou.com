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
  experimental: {
    ppr: 'incremental',
  },
}

export default withMDX(nextConfig)
