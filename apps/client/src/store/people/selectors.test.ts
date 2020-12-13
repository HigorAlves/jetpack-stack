import { InitialState } from './reducer'
import { Selector } from './selectors'

describe('people selectors', () => {
  it('count people', () => {
    expect(Selector(InitialState).countPeople()).toBe(0)
  })

  it('get message', () => {
    expect(Selector(InitialState).getMessage()).toBe(InitialState.message)
  })
})
