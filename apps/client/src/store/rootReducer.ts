import React from 'react'

import { GitHubReducer } from './github'
import { PeopleReducer } from './people'

export const initialState: StoreTypes.StateType = {
  people: PeopleReducer.InitialState,
  github: GitHubReducer.InitialState
}

export const Reducer: React.Reducer<
  StoreTypes.StateType,
  StoreTypes.ActionTypes
> = (state: StoreTypes.StateType, action: StoreTypes.ActionTypes) => {
  return {
    people: PeopleReducer.reducer(state.people, action),
    github: GitHubReducer.reducer(state.github, action)
  }
}
