import React from 'react'

import * as Sentry from '@sentry/react'
import { HomePage } from 'pages'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

const SentryRoute = Sentry.withSentryRouting(Route as any)

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
