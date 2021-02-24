import { CONFIG_VARS } from '~/types/configuration'

export default (): CONFIG_VARS => ({
	database: {
		url: process.env.DATABASE_URL
	},
	jwt: {
		duration: 60 * 60 * 8, // seconds - minutes - hours
		secret: process.env.JWT_SECRET
	},
	sentry: {
		dsn: process.env.SENTRY_DSN
	}
})
