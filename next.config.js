const withPWA = require('next-pwa');
const generateSitemap = require('./scripts/generate-sitemap');

module.exports = withPWA({
  // webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
  //   if (isServer) {
  //     generateSitemap();
  //   }
  //   return config;
  // },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public'
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'abs.twimg.com',
      'graph.facebook.com',
      'avatars.githubusercontent.com'
    ]
  },
  i18n: {
    locales: ['en', 'zh-cn', 'ar'],
    defaultLocale: 'en'
  }
});
