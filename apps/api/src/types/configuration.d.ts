export type CONFIG_VARS = {
	database: {
		url: string
	}
	jwt: {
		secret: string
		duration: number
	}
	sentry: {
		dsn: string
	}
}
