import * as peopleActions from './actions'
import * as peopleTypes from './types'

describe('people actions', () => {
  it('should dispatch an action to change the text', () => {
    expect(peopleActions.changeText('text')).toEqual({
      type: peopleTypes.Types.CHANGE_TEXT,
      payload: { message: 'text' }
    })
  })

  it('should dispatch an action to update people', () => {
    const people = ['Name 1', 'Name 2']
    expect(peopleActions.changePeople(people)).toEqual({
      type: peopleTypes.Types.UPDATE,
      payload: { people }
    })
  })
})
