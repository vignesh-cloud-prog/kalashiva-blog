module.exports = {
  eslint: {
    dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    domains: ["firebasestorage.googleapis.com",'localhost',"127.0.0.1"],
  },
  reactStrictMode: true,
}
