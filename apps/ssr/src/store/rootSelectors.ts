import * as People from '~/store/people/selectors'
import { initialState } from '~/store/rootReducer'

export function selectors(state = initialState): StoreTypes.Selector {
  const people = People.Selector(state.people)

  return {
    people
  }
}
