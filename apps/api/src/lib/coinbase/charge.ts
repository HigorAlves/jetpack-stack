import coinbase from 'coinbase-commerce-node'

const chargeData = {
  name: 'The Sovereign Individual',
  description: 'Mastering the Transition to the Information Age',
  pricing_type: 'fixed_price',
  local_price: {
    amount: '100.00',
    currency: 'USD'
  }
}

export class Charge {
  private charge

  constructor() {
    this.charge = coinbase.resources.Charge
  }

  async create(data = chargeData) {
    let response = null
    this.charge.create(data, (error, res) => {
      if (error) response = error
      response = res
    })
    return response
  }
}
