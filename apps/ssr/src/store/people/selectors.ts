import * as PeopleTypes from './types'

export function Selector(state: PeopleTypes.State): PeopleTypes.Selector {
  function getMessage(): string {
    return state.message
  }

  function countPeople(): number {
    return state.people.length
  }

  return {
    getMessage,
    countPeople
  }
}
