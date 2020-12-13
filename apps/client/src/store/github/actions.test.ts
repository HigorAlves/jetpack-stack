import { failedAPIResponse } from '../../../__mocks__/failedAPIResponse'
import {
  organizationRepositoriesMock,
  organizationRepositoriesResponseMock
} from '../../../__mocks__/organizationRepositoriesResponse'
import * as actions from './actions'

describe('github actions', () => {
  it('get organization repositories', async () => {
    organizationRepositoriesMock()

    const dispatchMock = jest.fn()
    expect(
      await actions.getOrganizationRepositories('natahouse')(dispatchMock)
    ).toBeUndefined()

    expect(dispatchMock.mock.calls[0]).toEqual([actions.clearError()])
    expect(dispatchMock.mock.calls[1]).toEqual([actions.enableLoading()])
    expect(dispatchMock.mock.calls[2]).toEqual([
      actions.getRepositoriesSuccess(organizationRepositoriesResponseMock)
    ])
    expect(dispatchMock.mock.calls[3]).toEqual([actions.disableLoading()])
    expect(dispatchMock.mock.calls.length).toBe(4)
  })

  it('set an error when get organizations repositories fail', async () => {
    failedAPIResponse({ method: 'get' })

    const dispatchMock = jest.fn()
    expect(
      await actions.getOrganizationRepositories('natahouse')(dispatchMock)
    ).toBeUndefined()

    expect(dispatchMock.mock.calls[0]).toEqual([actions.clearError()])
    expect(dispatchMock.mock.calls[1]).toEqual([actions.enableLoading()])
    expect(dispatchMock.mock.calls[2]).toEqual([
      actions.getRepositoriesError('Network Error')
    ])
    expect(dispatchMock.mock.calls[3]).toEqual([actions.disableLoading()])
    expect(dispatchMock.mock.calls.length).toBe(4)
  })
})
