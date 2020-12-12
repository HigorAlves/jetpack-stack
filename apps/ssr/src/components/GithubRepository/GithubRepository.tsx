import React from 'react'

import styles from './GithubRepository.module.scss'
import { Repository } from '~/services/fetch-github/types'

const GithubRepository: React.FC<Repository> = ({
  name,
  html_url: htmlUrl,
  stargazers_count: stars,
  forks,
  description
}) => (
  <article className={styles.repository}>
    <p>
      📦
      <a href={htmlUrl} target='_blank' rel='noreferrer'>
        {name}
      </a>{' '}
      - ⭐ {stars} - 🔗 {forks}
    </p>
    <p>{description}</p>
  </article>
)

export default GithubRepository
