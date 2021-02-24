import { Reducer } from 'redux'

import { LoginActions, LoginState, LoginTypes } from './types'

const INITIAL_STATE: LoginState = {
	error: '',
	loading: false,
	token: ''
}

export const loginReducer: Reducer<LoginState, LoginActions> = (
	state = INITIAL_STATE,
	action: LoginActions
) => {
	switch (action.type) {
		case LoginTypes.LOGIN:
			return { ...state, loading: true }
		case LoginTypes.SUCCESS:
			return { ...state, loading: false, token: action.payload.token }
		case LoginTypes.FAILURE:
			return { ...state, loading: false, error: action.payload.error.message }
		case LoginTypes.REGISTER:
			return { ...state, loading: true }
		case LoginTypes.REGISTER_SUCCESS:
			return { ...state, loading: false }
		case LoginTypes.REGISTER_FAILURE:
			return { ...state, loading: false, error: 'Aconteceu algo de errado' }

		default:
			return state
	}
}
