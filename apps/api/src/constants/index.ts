import * as Dotenv from 'dotenv'
Dotenv.config()

export const MONGO_DB = {
  URL: process.env.DATABASE_URL
}

export const JWT = {
  secret: process.env.JWT_SECRET,
  duration: 60 * 60 * 8 // seconds - minutes - hours
}

export const SENTRY = {
  dsn: process.env.SENTRY_DSN
}

export const PORT = process.env.PORT || 8080

export const SENDGRID = process.env.SENDGRID_API_KEY

export const STRIPE_API = process.env.STRIPE_API_KEY
export const COINBASE_API = process.env.COINBASE_API_KEY

export const API_VERSION = process.env.npm_package_version
