/*
  https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42#gistcomment-3377800
  withThunk is a dispatch middleware. When dispatch is invoked if the action is a function it will call
  the function passing down the dispatch itself, if the action is not a function (an object) it will delegate
  to dispatch
*/
import React from 'react'

export default function withThunk(
  dispatch: React.Dispatch<StoreTypes.ActionTypes>
) {
  return (actionOrThunk: StoreTypes.ActionOrThunk): void => {
    typeof actionOrThunk === 'function'
      ? actionOrThunk(dispatch)
      : dispatch(actionOrThunk)
  }
}
