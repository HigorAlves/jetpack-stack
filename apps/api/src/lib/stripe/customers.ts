import Stripe from 'stripe'

import { stripe } from './index'

export class Customers {
	async create(data: Stripe.CustomerCreateParams): Promise<Stripe.Customer> {
		return await stripe.customers.create(data)
	}

	async get(id: string) {
		return await stripe.customers.retrieve(id)
	}

	async update(id: string, data: Stripe.CustomerUpdateParams) {
		return await stripe.customers.update(id, data)
	}

	async remove(id: string) {
		return await stripe.customers.del(id)
	}

	async listAll(limit: number) {
		return stripe.customers.list({ limit })
	}
}
