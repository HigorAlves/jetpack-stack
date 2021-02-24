import React from 'react'

import styles from './StaticGeneration.module.scss'
import { GithubRepository } from '~/components'
import { Repository } from '~/services/fetch-github/types'

type Props = {
	repos: Repository[]
}

const StaticGeneration: React.FC<Props> = ({ repos }) => {
	return (
		<div className={styles.main}>
			<h1>Static generation (with data)</h1>
			<p>
				If a page uses Static Generation, the page HTML is generated at build
				time. That means in production, the page HTML is generated when you run
				next build. This HTML will then be reused on each request.
			</p>
			<p>
				This list is pre rendered using <code>getStaticProps</code>, so after
				build this pages will load instantly.
			</p>
			<em>
				Remember: this data is only fetched on build time. This list will only
				update on build run.
			</em>
			<h2>nata.house&apos;s public repositories</h2>
			<ul>
				{repos.map(repo => (
					<li key={repo.id}>
						<GithubRepository {...repo} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default StaticGeneration
