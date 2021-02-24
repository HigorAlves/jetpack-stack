import { RootState } from '../rootReducer'

export function getLoginSate(state: RootState) {
	return state.login
}

export function hasError(state: RootState) {
	return state.login.error
}
