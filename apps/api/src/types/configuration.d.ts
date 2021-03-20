export type CONFIG_VARS = {
	mongo: {
		url: string
	}
	jwt: {
		secret: string
		duration: number
	}
	sentry: {
		dsn: string
	}
	port: number
	sendgrid: {
		apiKey: string
	}
	stripe: {
		apiKey: string
	}
	coinbase: {
		apiKey: string
	}
	apiVersion: string
	logDna: {
		key: string
		hostname: string
		app: string
		env: string
		handleExceptions: boolean
	}
}
