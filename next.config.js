/** @type {import('next').NextConfig} */

import createMDX from '@next/mdx'

const withMDX = createMDX({
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    agentUpgrade: 'security',
  },
}

export default withMDX(nextConfig)
