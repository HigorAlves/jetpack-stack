/**
 * Data Types
 */

export type Login = {
	email: string
	password: string
}

/**
 * State type
 */
export interface LoginState {
	readonly loading: boolean
	readonly error: string
	readonly token: string
}

/**
 * Actions Type
 */
export enum LoginTypes {
	'LOGIN' = '@AUTH/LOGIN_REQUEST',
	'SUCCESS' = '@AUTH/LOGIN_SUCCESS',
	'FAILURE' = '@AUTH/LOGIN_FAILURE',
	'REGISTER' = '@AUTH/REGISTER_REQUEST',
	'REGISTER_SUCCESS' = '@AUTH/REGISTER_SUCCESS',
	'REGISTER_FAILURE' = '@AUTH/REGISTER_FAILURE'
}

export interface LoadData {
	type: typeof LoginTypes.LOGIN
	payload: Login
}

export interface LoadSuccess {
	type: typeof LoginTypes.SUCCESS
	payload: {
		token: string
	}
}

export interface LoadError {
	type: typeof LoginTypes.FAILURE
	payload: {
		error: {
			message: string
		}
	}
}

export interface RegisterRequest {
	type: typeof LoginTypes.REGISTER
	payload: any
}

export interface RegisterSuccess {
	type: typeof LoginTypes.REGISTER_SUCCESS
}

export interface RegisterError {
	type: typeof LoginTypes.REGISTER_FAILURE
}

export type LoginActions =
	| LoadData
	| LoadSuccess
	| LoadError
	| RegisterRequest
	| RegisterError
	| RegisterSuccess
