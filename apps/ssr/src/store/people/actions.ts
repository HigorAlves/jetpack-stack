import * as PeopleTypes from './types'
import { fetcher } from '~/utils/fetcher'

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
    type: PeopleTypes.Types.UPDATE_PEOPLE,
    payload: {
      people
    }
  }
}

export function fetchUsers(): (
  dispatch: StoreTypes.Dispatcher
) => Promise<void> {
  return async dispatch => {
    const data = await fetcher<string[]>(
      'https://jsonplaceholder.typicode.com/users'
    )

    dispatch(changePeople(data))
  }
}
