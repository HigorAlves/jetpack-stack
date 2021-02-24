import { GithubActionTypes, IGetRepos, ISuccessGetRepos } from './types'

export function getRepos(): IGetRepos {
	return {
		type: GithubActionTypes.GET_REPOSITORIES,
		payload: {
			loading: true
		}
	}
}

export function successLoad(): ISuccessGetRepos {
	return {
		type: GithubActionTypes.GET_REPOSITORIES_SUCCESS,
		payload: {
			loading: false
		}
	}
}
