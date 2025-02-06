import localFont from 'next/font/local'

export const beausiteFont = localFont({
  src: [
    {
      path: '../assets/fonts/Regular/BeausiteClassicWeb-Regular.woff2',
      weight: '400',
    },
    {
      path: '../assets/fonts/Medium/BeausiteClassicWeb-Medium.woff2',
      weight: '500',
    },
    {
      path: '../assets/fonts/Bold/BeausiteClassicWeb-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-beausite',
})
