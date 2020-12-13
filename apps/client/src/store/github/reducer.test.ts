import { organizationRepositoriesResponseMock } from '../../../__mocks__/organizationRepositoriesResponse'
import * as actions from './actions'
import { InitialState, reducer } from './reducer'
import * as types from './types'

describe('github reducers', () => {
  it('should be loading fill with true', async () => {
    expect(reducer(InitialState, actions.enableLoading())).toEqual({
      ...InitialState,
      loading: true
    })
  })

  it('should be loading fill with false', async () => {
    expect(reducer(InitialState, actions.disableLoading())).toEqual({
      ...InitialState,
      loading: false
    })
  })

  it('should be clear error', async () => {
    expect(
      reducer({ ...InitialState, error: 'error' }, actions.clearError())
    ).toEqual({
      ...InitialState,
      error: null
    })
  })

  it('should be set repositories', async () => {
    expect(
      reducer(
        { ...InitialState, error: 'error' },
        actions.getRepositoriesSuccess(organizationRepositoriesResponseMock)
      )
    ).toEqual({
      ...InitialState,
      repositories: organizationRepositoriesResponseMock
    })
  })

  it('should be set error', async () => {
    expect(
      reducer(
        { ...InitialState, error: 'error' },
        actions.getRepositoriesError('error')
      )
    ).toEqual({
      ...InitialState,
      error: 'error'
    })
  })

  it('when dispatch an unknown action', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(reducer(undefined, { type: 'UNKNOWN', payload: null })).toEqual(
      InitialState
    )
  })
})
