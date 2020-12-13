import * as types from './types'

export function Selector(state: types.State): types.Selector {
  function hasError(): string | null {
    return state.error
  }

  function getRepositories(): Repository[] {
    return state.repositories
  }

  function isLoading(): boolean {
    return state.loading
  }

  return {
    hasError,
    getRepositories,
    isLoading
  }
}
