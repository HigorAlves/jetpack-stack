import { CONFIG_VARS } from '~/types/configuration'

const CONSTANTS = (): CONFIG_VARS => ({
	apiVersion: process.env.npm_package_version,
	port: 8080,
	jwt: {
		duration: 60 * 60 * 8, // seconds - minutes - hours
		secret: process.env.JWT_SECRET
	},
	sentry: {
		dsn: process.env.SENTRY_DSN
	},
	mongo: {
		url: process.env.DATABASE_URL
	},
	sendgrid: {
		apiKey: process.env.SENDGRID_API_KEY
	},
	stripe: {
		apiKey: process.env.STRIPE_API_KEY
	},
	coinbase: {
		apiKey: process.env.COINBASE_API_KEY
	},
	logDna: {
		key: process.env.LOGDNA_KEY,
		hostname: process.env.LOGDNA_HOSTNAME,
		app: process.env.LOGDNA_APP,
		env: process.env.LOGDNA_ENV,
		handleExceptions: true
	}
})

export default CONSTANTS
