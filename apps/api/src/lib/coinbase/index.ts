import coinbase from 'coinbase-commerce-node'

import { Charge } from './charge'
import { COINBASE_API } from '~/constants'

const coin = coinbase.Client
coin.init(COINBASE_API)

export { Charge }
