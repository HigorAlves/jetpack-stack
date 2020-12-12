import * as PeopleTypes from './types'

export const InitialState: PeopleTypes.State = {
  message: '👩‍🚀 Click to run an action',
  people: []
}

export function reducer(
  state = InitialState,
  action: PeopleTypes.Actions
): PeopleTypes.State {
  switch (action.type) {
    case PeopleTypes.Types.CHANGE_TEXT:
      return { ...state, message: action.payload.message }
    case PeopleTypes.Types.UPDATE_PEOPLE:
      return { ...state, people: action.payload.people }
    default:
      return state
  }
}
