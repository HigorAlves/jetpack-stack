import * as Github from 'store/github/selectors'
import * as People from 'store/people/selectors'
import { initialState } from 'store/rootReducer'

export function selectors(state = initialState): StoreTypes.Selector {
  const people = People.Selector(state.people)
  const github = Github.Selector(state.github)

  return {
    people,
    github
  }
}
