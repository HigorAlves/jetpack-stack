import { Dispatch } from 'react'

import * as githubAPI from 'services/api/github'

import * as types from './types'

export const getRepositoriesSuccess = (
  payload: Repository[]
): types.Actions => ({
  type: types.Types.GET_REPOSITORIES_SUCCESS,
  payload
})

export const getRepositoriesError = (payload: string): types.Actions => ({
  type: types.Types.GET_REPOSITORIES_ERROR,
  payload
})

export const enableLoading = (): types.Actions => ({
  type: types.Types.ENABLE_LOADING,
  payload: null
})

export const disableLoading = (): types.Actions => ({
  type: types.Types.DISABLE_LOADING,
  payload: null
})

export const clearError = (): types.Actions => ({
  type: types.Types.CLEAR_ERROR,
  payload: null
})

export const getOrganizationRepositories = (organizationName: string) => async (
  dispatch: Dispatch<StoreTypes.ActionTypes>
): Promise<void> => {
  try {
    dispatch(clearError())
    dispatch(enableLoading())

    const response = await githubAPI.getOrganizationRepositories(
      organizationName
    )

    if (response) {
      return dispatch(getRepositoriesSuccess(response.data))
    }
  } catch (error) {
    dispatch(getRepositoriesError(error.message))
  } finally {
    dispatch(disableLoading())
  }
}
