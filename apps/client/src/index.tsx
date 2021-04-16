import React from 'react'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from 'router'
import { store } from 'store'

import * as serviceWorker from './serviceWorker'
import './i18n'

Sentry.init({
	dsn: process.env.REACT_APP_SENTRY_DSN,
	release: 'v' + process.env.REACT_APP_VERSION,
	integrations: [new Integrations.BrowserTracing()],
	tracesSampleRate: 1.0,
	debug: process.env.NODE_ENV === 'development',
	environment: process.env.REACT_APP_ENVIROMENT
})

ReactDOM.render(
	<React.StrictMode>
		<Sentry.ErrorBoundary fallback={'An error has occurred'}>
			<Provider store={store}>
				<Router />
			</Provider>
		</Sentry.ErrorBoundary>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
