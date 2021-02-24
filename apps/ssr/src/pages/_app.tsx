import React from 'react'

import { AppProps } from 'next/app'
import Head from 'next/head'

import JsonLd from '~/components/JSONLD/Jsonld'
import { getHomeSchema } from '~/services/schema'
import { storeWrapper } from '~/store'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<link rel='icon' href='/favicon.ico' />
				<title>Next.Js Template</title>
				<JsonLd
					schema={getHomeSchema({
						title: 'NextJs Boilerplate',
						url: 'http://localhost:3000',
						description: 'Boilerplate for NextJS projects',
						socialSharingImage:
							'https://camo.githubusercontent.com/db3540f66c4d2170a1e9e4d504026cd387a58bd2/68747470733a2f2f692e696d6775722e636f6d2f7968775a5265782e706e67',
						headline: 'Boilerplate for NextJS projects'
					})}
				/>
			</Head>

			<Component {...pageProps} />
		</>
	)
}

export default storeWrapper.withRedux(MyApp)
