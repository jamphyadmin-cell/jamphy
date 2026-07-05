export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/profile/',
        '/vault/',
        '/study-plan/',
        '/sprint/',
      ],
    },
    sitemap: 'https://jamphy.com/sitemap.xml',
  };
}
