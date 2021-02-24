import React from 'react'

import Head from 'next/head'

import { WithFallback } from '~/containers'
import { fetchUser } from '~/services/fetch-github'
import { MOCADA } from '~/services/fetch-github/constants'
import { User } from '~/services/fetch-github/types'

type StaticPaths = {
	paths: string[]
	fallback: boolean
}

export async function getStaticPaths(): Promise<StaticPaths> {
	const paths = MOCADA.map(name => `/dynamic-routes/nativo/${name}`)

	return { paths, fallback: true }
}

type Params = {
	params: {
		nativo: string
	}
}
type StaticProps = {
	props: {
		nativo: User
	}
}

export async function getStaticProps({ params }: Params): Promise<StaticProps> {
	const nativo = await fetchUser(params.nativo)

	return { props: { nativo } }
}

type Props = {
	nativo: User
}

export default function NativoPage({ nativo }: Props): JSX.Element {
	return (
		<>
			<Head>
				<title>Incremental Static Generation | Nata.House NextJs</title>
			</Head>
			<main>
				<WithFallback nativo={nativo} />
			</main>
		</>
	)
}
