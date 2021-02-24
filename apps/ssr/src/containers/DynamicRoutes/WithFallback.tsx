import React from 'react'

import { useRouter } from 'next/router'

import styles from './DynamicRoutes.module.scss'
import { User } from '~/services/fetch-github/types'

type Props = {
	nativo: User
}

const WithFallback: React.FC<Props> = ({ nativo }) => {
	const router = useRouter()
	const sinceDate = new Date(nativo?.created_at || '').toLocaleDateString(
		'pt-BR'
	)

	return (
		<div className={styles.main}>
			<h1>Dynamic route with fallback (Incremental Static Generation)</h1>
			<p>
				This page was statically generated, pre rendered at the first time It
				was requested, showing a fallback &apos;Loading&apos; state while the
				data is fetched. After that the page is already rendered to be delivered
				for the next requests.
			</p>
			<p>
				Try to change the natahouse url param with your github user to see the
				magic ✨
			</p>
			<hr />
			{router.isFallback ? (
				<h2>Loading...</h2>
			) : (
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
			)}
		</div>
	)
}

export default WithFallback
