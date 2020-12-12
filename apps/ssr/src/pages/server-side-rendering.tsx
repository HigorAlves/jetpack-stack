import React from 'react'

import Head from 'next/head'

import { ServerSideRendering } from '~/containers'
import { fetchRepo } from '~/services/fetch-github'
import { Repository } from '~/services/fetch-github/types'

type ServerProps = {
  props: {
    repo: Repository
  }
}

export async function getServerSideProps(): Promise<ServerProps> {
  const repo = await fetchRepo('vercel', 'next.js')

  return { props: { repo } }
}

type Props = {
  repo: Repository
}

export default function ServerSideRenderingPage({ repo }: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Server Side Rendering | Nata.House NextJs</title>
      </Head>
      <main>
        <ServerSideRendering repo={repo} />
      </main>
    </>
  )
}
