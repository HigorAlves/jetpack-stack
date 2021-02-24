import { combineReducers } from 'redux'

import { loginReducer } from './authentication/reducer'

export const rootReducer = combineReducers({
	login: loginReducer
})

export type RootState = ReturnType<typeof rootReducer>
