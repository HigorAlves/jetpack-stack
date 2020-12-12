import React from 'react'

import styles from './DetailedGithubRepository.module.scss'
import { Repository } from '~/services/fetch-github/types'

const DetailedGithubRepository: React.FC<Repository> = ({
  name,
  html_url: htmlUrl,
  stargazers_count: stars,
  forks,
  description,
  owner,
  homepage,
  open_issues_count: issues
}) => {
  return (
    <article className={styles.repository}>
      <img src={owner.avatar_url} className={styles['repository-profile']} />
      <div>
        <a href={htmlUrl} target='_blank' rel='noreferrer'>
          <h1>
            📦 {name} from {owner.login}
          </h1>
        </a>
        <p>{description}</p>
        <p>
          <a href={homepage} target='_blank' rel='noreferrer'>
            {homepage}
          </a>
        </p>
        <p>⭐ {stars} Stars</p>
        <p>🔗 {forks} Forks</p>
        <p>🚨 {issues} Issues</p>
      </div>
    </article>
  )
}

export default DetailedGithubRepository
