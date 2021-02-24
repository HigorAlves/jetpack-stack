import { combineReducers } from 'redux'

import { githubReducer } from './github/reducer'

export const rootReducer = combineReducers({
	github: githubReducer
})

export type RootState = ReturnType<typeof rootReducer>
