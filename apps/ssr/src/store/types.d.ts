type PeopleTypes = import('./people/types')

declare namespace StoreTypes {
  type StateType = {
    people: PeopleTypes.State
  }

  type ActionTypes = PeopleTypes.Actions

  type ContextType = {
    state: StateType
    dispatch: ActionOrThunk
  }

  type Selector = {
    people: PeopleTypes.Selector
  }

  type useStore = {
    state: StateType
    dispatch: ActionOrThunk
    selectors: Selector
  }

  type Props = {
    children: React.ReactNode
  }

  type Thunk = (dispatch: React.Dispatch<ActionType>) => void
  type ActionOrThunk = Thunk | ActionType

  type Dispatcher = React.Dispatch<ActionType>
}

declare type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] }
}
