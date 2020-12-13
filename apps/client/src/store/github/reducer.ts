import * as types from './types'

export const InitialState: types.State = {
  repositories: [],
  error: null,
  loading: false
}

export function reducer(
  state = InitialState,
  action: types.Actions
): types.State {
  switch (action.type) {
    case types.Types.ENABLE_LOADING:
      return { ...state, loading: true }

    case types.Types.DISABLE_LOADING:
      return { ...state, loading: false }

    case types.Types.CLEAR_ERROR:
      return { ...state, error: null }

    case types.Types.GET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        repositories: action.payload
      }

    case types.Types.GET_REPOSITORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}
