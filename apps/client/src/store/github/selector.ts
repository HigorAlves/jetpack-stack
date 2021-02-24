import { RootState } from '../rootReducer'
import { IGithubState } from './types'

export function getRepos(state: RootState): IGithubState {
	return state.github
}
