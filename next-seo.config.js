const title = 'Symput';
const description = 'A keyboard for typing mathematics';

const SEO = {
  title,
  description,
  canonical: 'https://www.symput.com',
  languageAlternates: [
    { hrefLang: 'en', href: 'https://www.symput.com' },
    { hrefLang: 'ar', href: 'https://www.symput.com/ar' },
    { hrefLang: 'zh-cn', href: 'https://www.symput.com/zh-cn' }
  ],
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'https://www.symput.com',
    title,
    description,
    images: [
      {
        url: 'https://www.symput.com/images/symput-logo.svg',
        alt: title,
        width: 1280,
        height: 1280
      }
    ]
  },
  twitter: {
    handle: '@Symput',
    site: '@Symput',
    cardType: 'summary_large_image',
    image: '/images/icons/android-chrome-512x512.png'
  },
  additionalLinkTags: [
    { rel: 'manifest', href: 'manifest.json' },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/images/icons/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/images/icons/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/images/icons/favicon-16x16.png'
    },
    {
      rel: 'mask-icon',
      href: '/images/icons/safari-pinned-tab.svg',
      color: '#5bbad5'
    },
    {
      rel: 'shortcut icon',
      href: '/images/icons/favicon.ico'
    }
  ],
  additionalMetaTags: [
    { name: 'apple-mobile-web-app-title', content: 'Symput' },
    { name: 'application-name', content: 'Symput' },
    { name: 'msapplication-TileColor', content: '#603cba' },
    {
      name: 'msapplication-config',
      content: '/images/icons/browserconfig.xml'
    },
    { name: 'theme-color', content: '#fbbf24' }
  ]
};

export default SEO;
