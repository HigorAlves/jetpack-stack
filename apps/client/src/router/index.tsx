import React from 'react'

import * as Sentry from '@sentry/react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { HomePage } from 'pages'

const SentryRoute = Sentry.withSentryRouting(Route)

export default function Routes(): JSX.Element {
	return (
		<BrowserRouter>
			<Switch>
				<SentryRoute path='/ts'>
					<h1>S</h1>
				</SentryRoute>
				<SentryRoute path='/'>
					<HomePage />
				</SentryRoute>
			</Switch>
		</BrowserRouter>
	)
}
