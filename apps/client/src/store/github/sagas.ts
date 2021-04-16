import { call, put } from 'redux-saga/effects'
import { successLoad } from 'store/github/actions'

import { ISuccessGetRepos } from './types'

export function* load(action: ISuccessGetRepos) {
	try {
		const { loading } = action.payload
		yield call(console.log, loading)

		yield put(successLoad())
	} catch (error) {
		console.log(error)
	}
}
