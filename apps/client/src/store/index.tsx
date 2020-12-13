import React, { createContext, useContext } from 'react'

import { useReducer } from 'reinspect'

import { initialState, Reducer } from 'store/rootReducer'
import { selectors as Selector } from 'store/rootSelectors'
import withThunk from 'store/withThunk'

const StoreContext = createContext<StoreTypes.ContextType>({
  state: initialState
} as StoreTypes.ContextType)

export const StoreProvider: React.FC<StoreTypes.Props> = ({
  children
}: StoreTypes.Props): JSX.Element => {
  const [state, dispatch] = useReducer(
    Reducer,
    initialState,
    state => state,
    'store'
  )

  return (
    <StoreContext.Provider value={{ state, dispatch: withThunk(dispatch) }}>
      {children}
    </StoreContext.Provider>
  )
}

const useStore = (): StoreTypes.useStore => {
  const { state, dispatch } = useContext(StoreContext)
  const selectors = Selector()

  return { state, dispatch, selectors }
}

export default useStore
