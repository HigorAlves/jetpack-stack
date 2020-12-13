import * as peopleActions from './actions'
import { InitialState, reducer } from './reducer'

describe('people reducers', () => {
  it('should update the message on dispatch change text action', () => {
    expect(reducer(InitialState, peopleActions.changeText('new text'))).toEqual(
      {
        ...InitialState,
        message: 'new text'
      }
    )
  })

  it('should update the people on dispatch change text action', () => {
    const people = ['Name 1', 'Name 2']
    expect(reducer(InitialState, peopleActions.changePeople(people))).toEqual({
      ...InitialState,
      people
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
