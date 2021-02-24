import React from 'react'

import Head from 'next/head'

import { DynamicPageIntro } from '~/containers'

export default function DynamicRoutes(): JSX.Element {
	return (
		<>
			<Head>
				<title>Dynamic Routes | Nata.House NextJs</title>
			</Head>
			<main>
				<DynamicPageIntro />
			</main>
		</>
	)
}
