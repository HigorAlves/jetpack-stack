import React from 'react'

import * as Sentry from '@sentry/react'
import { HomePage, Login } from 'pages'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const SentryRoute = Sentry.withSentryRouting(Route as any)

export default function Routes(): JSX.Element {
	return (
		<BrowserRouter>
			<Switch>
				<SentryRoute path='/login'>
					<Login />
				</SentryRoute>
				<SentryRoute path='/'>
					<HomePage />
				</SentryRoute>
			</Switch>
		</BrowserRouter>
	)
}
