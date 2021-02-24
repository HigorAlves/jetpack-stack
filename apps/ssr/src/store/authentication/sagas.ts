import { call, put } from 'redux-saga/effects'

import {
	loadSuccess,
	loadFailure,
	registerError,
	registerSuccess
} from './actions'
import { RegisterRequest, LoadData } from './types'

export function* loginSaga(action: LoadData) {
	try {
		const { payload } = action
		// const response = yield call(console.log, payload)

		// yield put(loadSuccess(response.token))
	} catch (error) {
		yield put(loadFailure(error))
	}
}

export function* registerSaga(action: RegisterRequest) {
	try {
		const { payload } = action
		// yield call(console.log, payload)

		yield put(registerSuccess())
	} catch (error) {
		yield put(registerError())
	}
}
