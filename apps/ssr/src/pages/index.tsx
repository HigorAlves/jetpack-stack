import React from 'react'

import Link from 'next/link'

import styles from '~/assets/styles/Home.module.scss'

export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>
      <h1>
        Welcome to nata.house <a href='https://nextjs.org'>Next.js</a>{' '}
        boilerplate!!
      </h1>

      <p>
        This page is an example of Static generation, just like the below
        example, but without data. That means no data is fetched or required to
        render this page component, making the content only HTML and CSS (you
        can test right-clicking the page and selecting &quot;View page
        source&quot;).
      </p>

      <h2>Examples</h2>
      <ul>
        <li>
          <Link href='/static-generation'>
            🖨️ Static generation (with data)
          </Link>
        </li>
        <li>
          <Link href='/dynamic-routes'>📋 Dynamic routes</Link>
        </li>
        <li>
          <Link href='/server-side-rendering'>
            🖥️ Server side rendering (+ client side request)
          </Link>
        </li>
      </ul>
    </main>
  )
}
