import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { HomePage } from 'pages'

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
