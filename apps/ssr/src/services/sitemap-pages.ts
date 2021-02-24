import globby from 'globby'

const BASE_URL = 'http://localhost:3000'

export const getStaticPages = async (): Promise<string[]> => {
	const pages = await globby([
		'src/pages/**/*{.ts,tsx}',
		'!src/pages/**/[*{.ts,tsx}',
		'!src/pages/_*.tsx',
		'!src/pages/api'
	])

	return pages
}

function addPage(page) {
	const path = page.replace('src/pages', '').replace('.tsx', '')
	const route = path === '/index' ? '/' : path

	return `  <url>
    <loc>${`${BASE_URL}${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`
}

export const createSitemap = (
	pages: string[]
): string => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages.map(page => addPage(page))}
    </urlset>
    `
