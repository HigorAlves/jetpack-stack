import React from 'react'

class ErrorBoundary extends React.Component {
	state = {
		hasError: false
	}

	// eslint-disable-next-line
	constructor(props: any) {
		super(props)
		this.state = { hasError: false }
	}

	// eslint-disable-next-line
	static getDerivedStateFromError(error: never) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	// eslint-disable-next-line
	componentDidCatch(error: any, errorInfo: any) {
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>
		}

		return this.props.children
	}
}

export default ErrorBoundary
