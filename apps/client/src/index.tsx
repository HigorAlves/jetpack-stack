import React from 'react'

import ReactDOM from 'react-dom'
import 'assets/styles/globals.scss'

import Router from './router'
import * as serviceWorker from './serviceWorker'
import { StoreProvider } from './store'
import StateInspectorComponent from './store/StateInspector'
import './i18n'

ReactDOM.render(
  <React.StrictMode>
    <StateInspectorComponent>
      <StoreProvider>
        <Router />
      </StoreProvider>
    </StateInspectorComponent>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
