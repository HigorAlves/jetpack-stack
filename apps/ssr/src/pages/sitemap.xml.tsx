import React from 'react'

// import { getMocadaPaths } from '~/pages/dynamic-routes/mocada/[mocada]'
// import { getStaticPages, createSitemap } from '~/services/sitemap-pages'
import { NextPageContext } from 'next'

class Sitemap extends React.Component {
	static async getInitialProps({ res }: NextPageContext): Promise<void> {
		// const staticPages = await getStaticPages()
		// const mocada = getMocadaPaths()

		// const pages = []

		res.setHeader('Content-Type', 'text/xml')
		// res.write(createSitemap(pages))
		res.end()
	}
}

export default Sitemap
