import { InitialState } from './reducer'
import { Selector } from './selectors'

describe('github selectors', () => {
  it('has error', () => {
    expect(Selector(InitialState).hasError()).toBe(null)
  })

  it('get repositories', () => {
    expect(Selector(InitialState).getRepositories()).toEqual([])
  })

  it('is loading', () => {
    expect(Selector(InitialState).isLoading()).toBe(false)
  })
})
