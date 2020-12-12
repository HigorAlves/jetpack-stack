import React from 'react'

import { fetcher } from 'src/utils/fetcher'
import useSWR from 'swr'

import styles from './ServerSideRendering.module.scss'
import { DetailedGithubRepository, RepositoryLanguages } from '~/components'
import { Repository } from '~/services/fetch-github/types'

type Props = {
  repo: Repository
}

type Languages = {
  [key: string]: string
}

const ServerSideRendering: React.FC<Props> = ({ repo }) => {
  const { data, error } = useSWR<Languages>(repo.languages_url, fetcher)

  return (
    <div className={styles.main}>
      <h1>Server side rendering (SSR)</h1>
      <p>
        You should use SSR only if you need to pre-render a page whose data must
        be fetched at request time. Time to first byte (TTFB) will be slower
        than <code>getStaticProps</code> because the server must compute the
        result on every request, and the result cannot be cached by a CDN
        without extra configuration.
      </p>
      <p>
        Inside <code>getServerSideProps</code> you recieve as function argument
        an object with the request and response data, like a node server.
      </p>
      <p>
        This example also has an example of client side fetch, that gets the
        languages used in that repository using vercel&apos;s <code>SWR</code>{' '}
        hook. You can also make the request like a normal request, get the
        languages data and pass to the <code>useSWR</code> hook in an object as
        tirth parameter with a key <code>`initialData`</code>. See more here:{' '}
        <a
          href='https://swr.vercel.app/docs/with-nextjs'
          target='_blank'
          rel='noreferrer'
        >
          Usage with Next.js
        </a>
        .
      </p>
      <em>
        Remember: this page are rendered on every request. Next.js uses a node
        server to make this happen.
      </em>
      <hr />
      <DetailedGithubRepository {...repo} />
      <RepositoryLanguages
        languages={data}
        isLoading={!data}
        errorMessage={error?.response.statusText}
      />
    </div>
  )
}

export default ServerSideRendering
