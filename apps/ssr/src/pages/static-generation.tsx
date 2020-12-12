import React from 'react'

import Head from 'next/head'

import { StaticGeneration } from '~/containers'
import { fetchPublicRepositories } from '~/services/fetch-github'
import { Repository } from '~/services/fetch-github/types'

type StaticProps = {
  props: {
    repos: Repository[]
  }
}

export async function getStaticProps(): Promise<StaticProps> {
  const repos = await fetchPublicRepositories()

  return { props: { repos } }
}

type Props = {
  repos: Repository[]
}

export default function StaticGenerationPage({
  repos = []
}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Static Generation | Nata.House NextJs</title>
      </Head>
      <main>
        <StaticGeneration repos={repos} />
      </main>
    </>
  )
}
