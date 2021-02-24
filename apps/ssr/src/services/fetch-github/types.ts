/* eslint-disable camelcase */
export type Repository = {
	id: string
	html_url: string
	name: string
	stargazers_count: string
	forks: string
	description: string
	homepage: string
	open_issues_count: number
	languages_url: string
	owner: Owner
}

export type User = {
	id: string
	name: string
	avatar_url: string
	html_url: string
	followers: number
	bio: string
	created_at: string
}

export type Owner = {
	avatar_url: string
	login: string
}
