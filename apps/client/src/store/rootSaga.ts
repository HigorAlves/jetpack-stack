import { all, takeLatest } from 'redux-saga/effects'

import { load } from './github/sagas'
import { GithubActionTypes } from './github/types'

export function* rootSaga(): Generator<any> {
	return yield all([takeLatest(GithubActionTypes.GET_REPOSITORIES, load)])
}
