import React from 'react'

import Link from 'next/link'

import styles from './DynamicRoutes.module.scss'
import { MOCADA } from '~/services/fetch-github/constants'

const DynamicPageIntro: React.FC = () => (
  <div className={styles.main}>
    <h1>Dynamic routes</h1>
    <p>
      Next.js allows you to create pages with dynamic routes. For example, you
      can create a file called <code>`pages/posts/[id].js`</code> to show a
      single blog post based on <code>`id`</code>. This will allow you to show a
      blog post with <code>`id: 1`</code>
      when you access <code>`posts/1`</code>.
    </p>
    <p>
      To do this, you can use the <code>getStaticPaths</code> to tell all the
      valid routes that will be built as static page. In this case, the{' '}
      <code>getStaticProps</code> will receive the route path as props to you
      use as you want.
    </p>
    <em>
      Remember: inside the <code>getStaticPaths</code> you can get the list of
      paths as JSON file, hardcoded, regex, from any fetched data... Anywhere.
    </em>
    <h2>Without fallback</h2>
    <p>
      If fallback is false, then any paths not returned by getStaticPaths will
      result in a 404 page. You can do this if you have a small number of paths
      to pre-render - so they are all statically generated during build time.
      It’s also useful when the new pages are not added often. If you add more
      items to the data source and need to render the new pages, you’d need to
      run the build again.
    </p>
    <p>Examples (fixed moçadas list)</p>
    <ul>
      {MOCADA.map((name, index) => (
        <li key={index}>
          <Link href={`/dynamic-routes/mocada/${name}`}>
            {`🏠 ${name}'s moçada page`}
          </Link>
        </li>
      ))}
    </ul>
    <h2>With fallback (Incremental Static Generation)</h2>
    <p>
      If fallback is true, then the behavior of <code>getStaticProps</code>{' '}
      changes:
    </p>
    <ol className={styles.list}>
      <li>
        The paths returned from getStaticPaths will be rendered to HTML at build
        time.
      </li>
      <li>
        The paths that have not been generated at build time will not result in
        a 404 page. Instead, Next.js will serve a “fallback” version of the page
        on the first request to such a path (see “Fallback pages” below for
        details).
      </li>
      <li>
        In the background, Next.js will statically generate the requested path
        HTML and JSON. This includes running getStaticProps.
      </li>
      <li>
        When that’s done, the browser receives the JSON for the generated path.
        This will be used to automatically render the page with the required
        props. From the user’s perspective, the page will be swapped from the
        fallback page to the full page.
      </li>
      <li>
        At the same time, Next.js adds this path to the list of pre-rendered
        pages. Subsequent requests to the same path will serve the generated
        page, just like other pages pre-rendered at build time.
      </li>
    </ol>
    <Link href='/dynamic-routes/nativo/natahouse'>
      ⚡ Dynamic route with fallback (Incremental Static Generation)
    </Link>
  </div>
)

export default DynamicPageIntro
