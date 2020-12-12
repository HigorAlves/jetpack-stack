import * as functions from 'firebase-functions'
import next from 'next'

const dev = false
const app = next({ dev, conf: { distDir: '.next' } })
const handle = app.getRequestHandler()

exports.next = functions.https.onRequest(async (req, res) => {
  await app.prepare()
  try {
    handle(req, res)
  } catch (error) {
    console.log('ERRO AQUI', error)
  }
})
