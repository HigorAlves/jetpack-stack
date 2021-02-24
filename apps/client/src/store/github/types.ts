export interface IGithubState {
	repositories: Record<string, string>
	error: string
	loading: boolean
}

export enum GithubActionTypes {
	GET_REPOSITORIES = '@github/GET_REPOSITORIES',
	GET_REPOSITORIES_SUCCESS = '@github/GET_REPOSITORIES_SUCCESS',
	GET_REPOSITORIES_ERROR = '@github/GET_REPOSITORIES_ERROR',
	ENABLE_LOADING = '@github/ENABLE_LOADING',
	DISABLE_LOADING = '@github/DISABLE_LOADING',
	CLEAR_ERROR = '@github/CLEAR_ERROR'
}

export interface IGetRepos {
	type: typeof GithubActionTypes.GET_REPOSITORIES
	payload: {
		loading: boolean
	}
}

export interface ISuccessGetRepos {
	type: typeof GithubActionTypes.GET_REPOSITORIES_SUCCESS
	payload: {
		loading: boolean
	}
}

export type GithubActions = IGetRepos | ISuccessGetRepos
