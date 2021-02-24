import { Reducer } from 'redux'

import { GithubActionTypes, IGithubState, GithubActions } from './types'

const INITIAL_STATE: IGithubState = {
	error: '',
	loading: false,
	repositories: { asd: 'teste' }
}

export const githubReducer: Reducer<IGithubState, GithubActions> = (
	state = INITIAL_STATE,
	action: GithubActions
) => {
	switch (action.type) {
		case GithubActionTypes.GET_REPOSITORIES:
			return { ...state, loading: true }
		default:
			return state
	}
}
