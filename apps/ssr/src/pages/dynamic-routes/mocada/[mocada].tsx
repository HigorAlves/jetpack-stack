import React from 'react'

import Head from 'next/head'

import { WithoutFallback } from '~/containers'
import { fetchUser } from '~/services/fetch-github'
import { MOCADA } from '~/services/fetch-github/constants'
import { User } from '~/services/fetch-github/types'

type StaticPaths = {
	paths: string[]
	fallback: boolean
}

export const getMocadaPaths = (): string[] =>
	MOCADA.map(name => `/dynamic-routes/mocada/${name}`)

export async function getStaticPaths(): Promise<StaticPaths> {
	const paths = getMocadaPaths()

	return { paths, fallback: false }
}

type Params = {
	params: {
		mocada: string
	}
}
type StaticProps = {
	props: {
		nativo: User
	}
}

export async function getStaticProps({ params }: Params): Promise<StaticProps> {
	const nativo = await fetchUser(params.mocada)

	return { props: { nativo } }
}

type Props = {
	nativo: User
}

export default function MocadaPage({ nativo }: Props): JSX.Element {
	return (
		<>
			<Head>
				<title>Dynamic Route pre rendered | Nata.House NextJs</title>
			</Head>
			<main>
				<WithoutFallback nativo={nativo} />
			</main>
		</>
	)
}
