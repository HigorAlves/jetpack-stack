import Stripe from 'stripe'

import { Checkout } from './checkout'
import { Customers } from './customers'
import { STRIPE_API, API_VERSION } from '~/constants'

export const stripe = new Stripe(STRIPE_API, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'Nest Js API',
    version: API_VERSION
  }
})

export { Customers, Checkout }
