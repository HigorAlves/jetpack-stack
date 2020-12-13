import {
  organizationRepositoriesMock,
  organizationRepositoriesResponseMock
} from '../../../__mocks__/organizationRepositoriesResponse'
import * as github from './github'

describe('github service', () => {
  it('get organization repositories', async () => {
    organizationRepositoriesMock()

    expect(await github.getOrganizationRepositories('natahouse')).toEqual({
      status: 200,
      data: organizationRepositoriesResponseMock
    })
  })
})
