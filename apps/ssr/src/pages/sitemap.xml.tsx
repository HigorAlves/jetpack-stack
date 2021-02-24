import React from 'react'

import { NextPageContext } from 'next'

import { getMocadaPaths } from '~/pages/dynamic-routes/mocada/[mocada]'
import { getStaticPages, createSitemap } from '~/services/sitemap-pages'

class Sitemap extends React.Component {
	static async getInitialProps({ res }: NextPageContext): Promise<void> {
		const staticPages = await getStaticPages()
		const mocada = getMocadaPaths()

		const pages = [...staticPages, ...mocada]

		res.setHeader('Content-Type', 'text/xml')
		res.write(createSitemap(pages))
		res.end()
	}
}

export default Sitemap
