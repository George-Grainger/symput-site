const withPWA = require('next-pwa');

module.exports = withPWA({
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
