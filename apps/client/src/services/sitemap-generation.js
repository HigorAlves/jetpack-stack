// eslint-disable-next-line
const fs = require('fs')

const BASE_URL = 'https://example.com.br/'
const pages = ['']

function addPage(page) {
  return `  <url>
    <loc>${`${BASE_URL}${page}`}</loc>
    <changefreq>daily</changefreq>
  </url>`
}

async function generateSitemap() {
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>`

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()
