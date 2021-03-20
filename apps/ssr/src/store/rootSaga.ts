import { all, takeLatest } from 'redux-saga/effects'

import { loginSaga, registerSaga } from './authentication/sagas'
import { LoginTypes } from './authentication/types'

export function* rootSaga(): any {
	return yield all([
		takeLatest(LoginTypes.LOGIN, loginSaga),
		takeLatest(LoginTypes.REGISTER, registerSaga)
	])
}
