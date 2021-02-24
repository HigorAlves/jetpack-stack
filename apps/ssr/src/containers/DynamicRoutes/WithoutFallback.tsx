import React from 'react'

import styles from './DynamicRoutes.module.scss'
import { User } from '~/services/fetch-github/types'

type Props = {
	nativo: User
}

const WithoutFallback: React.FC<Props> = ({ nativo }) => {
	const sinceDate = new Date(nativo.created_at).toLocaleDateString('pt-BR')

	return (
		<div className={styles.main}>
			<h1>Dynamic route pre rendered (fixed data)</h1>
			<p>
				This page was pre rendered at build time. This data came from a pre
				created array of users passed to getStaticPaths. Since the fallback is
				false, all the routes that don&apos;t match in this list of paths, will
				return a 404 page.
			</p>
			<hr />
			<div className={styles.about}>
				<img src={nativo.avatar_url} className={styles['about-profile']} />
				<div>
					<a href={nativo.html_url} target='_blank' rel='noreferrer'>
						<h1>{nativo.name}</h1>
					</a>
					<blockquote>{nativo.bio}</blockquote>
					<p>Followers: {nativo.followers}</p>
					<p>In github since {sinceDate}</p>
				</div>
			</div>
		</div>
	)
}

export default WithoutFallback
