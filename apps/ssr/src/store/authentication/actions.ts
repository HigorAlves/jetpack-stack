import {
	Login,
	LoginTypes,
	LoadData,
	LoadError,
	LoadSuccess,
	RegisterError,
	RegisterRequest,
	RegisterSuccess
} from './types'

export function login(props: Login): LoadData {
	return {
		type: LoginTypes.LOGIN,
		payload: props
	}
}

export function loadSuccess(token: string): LoadSuccess {
	return {
		type: LoginTypes.SUCCESS,
		payload: {
			token
		}
	}
}

export function loadFailure(error: { message: string }): LoadError {
	return {
		type: LoginTypes.FAILURE,
		payload: {
			error
		}
	}
}

export function registerRequest(data: any): RegisterRequest {
	return {
		type: LoginTypes.REGISTER,
		payload: data
	}
}

export function registerSuccess(): RegisterSuccess {
	return {
		type: LoginTypes.REGISTER_SUCCESS
	}
}

export function registerError(): RegisterError {
	return {
		type: LoginTypes.REGISTER_FAILURE
	}
}
