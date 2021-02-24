import Stripe from 'stripe'

import { stripe } from './index'

export class Checkout {
	async create(price: string) {
		return await stripe.checkout.sessions.create({
			success_url: '',
			cancel_url: '',
			payment_method_types: ['card'],
			mode: 'payment',
			allow_promotion_codes: true,
			line_items: [
				{
					price_data: { unit_amount_decimal: price, currency: 'USD' },
					quantity: 1
				}
			]
		})
	}

	async get(id: string): Promise<Stripe.Checkout.Session> {
		return await stripe.checkout.sessions.retrieve(id)
	}

	async list(limit: number): Promise<Stripe.ApiList<Stripe.Checkout.Session>> {
		return await stripe.checkout.sessions.list({ limit })
	}
}
