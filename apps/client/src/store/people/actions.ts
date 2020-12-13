import * as PeopleTypes from './types'

export function changeText(message: string): PeopleTypes.Actions {
  return {
    type: PeopleTypes.Types.CHANGE_TEXT,
    payload: {
      message
    }
  }
}

export function changePeople(people: string[]): PeopleTypes.Actions {
  return {
    type: PeopleTypes.Types.UPDATE,
    payload: {
      people
    }
  }
}
