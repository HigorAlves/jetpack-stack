import axios from 'axios'

import { NATA_REPOS_URL, USER_URL, REPO_URL } from './constants'
import { Repository, User } from './types'

const api = axios.create({
	baseURL: 'https://api.github.com'
})

export async function fetchPublicRepositories(): Promise<Repository[]> {
	try {
		const { data } = await api.get(NATA_REPOS_URL)
		return data
	} catch (error) {
		throw new Error('Error while fetching public repositories')
	}
}

export async function fetchUser(user: string): Promise<User> {
	try {
		const { data } = await api.get(USER_URL(user))
		return data
	} catch (error) {
		throw new Error('Error while fetching user information')
	}
}

export async function fetchRepo(
	owner: string,
	repo: string
): Promise<Repository> {
	try {
		const { data } = await api.get(REPO_URL(owner, repo))
		return data
	} catch (error) {
		throw new Error('Error while fetching public repository')
	}
}
