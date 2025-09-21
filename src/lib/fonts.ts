import localFont from 'next/font/local'

// Iransans font configuration
export const iransans = localFont({
  src: [
    {
      path: '../app/fonts/IRANSANSWEB_ULTRALIGHT.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../app/fonts/IRANSANSWEB.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../app/fonts/IRANSANS_MEDIUM.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../app/fonts/IRANSANSWEB_BOLD.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-iransans',
  display: 'swap',
})

// Kalame font configuration
export const kalame = localFont({
  src: [
    {
      path: '../app/fonts/Kalameh thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../app/fonts/Kalameh Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../app/fonts/Kalameh Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../app/fonts/Kalameh Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-kalame',
  display: 'swap',
})
