import express from 'express'
import { v4 } from 'uuid'
import { getBlockchain, getAmountPerClient } from './blockchain'
import { createTransaction } from './transactions'

import type { TransactionQuery } from 'Transaction'

const PORT = 3000

const app = express()

app.get('/', (_, res) => {
  res.send(`Server is running on port ${PORT}`)
})

/* Create a new transaction */
app.post('/transactions', ({ query }: TransactionQuery, res) => {
  // Sender is undefined, empty or null
  if (!query.sender) {
    res
      .send('Missing sender')
      .status(400)
  }

  // Recipient is undefined, empty or null
  if (!query.recipient) {
    res
      .send('Missing recipient')
      .status(400)
  }
  
  // Recipient is undefined, 0 or null
  if (!query.amount) {
    res
      .send('Missing amount')
      .status(400)
  }

  createTransaction(query)
  res.send('Transaction created')
})

/* An client connects to the blockchain and creates its wallet */
app.post('/wallet', (_, res) => {
  res.send(JSON.stringify({
    wallet: v4()
  }))
})

app.get('/wallet/:id', ({ query }: { query: { wallet: string } }, res) => {
  res.send({
    wallet: query.wallet,
    amount: getAmountPerClient(query.wallet)
  })
})

/* Get the full blockchain */
app.get('/blockchain', (_, res) => {
  res.send(JSON.stringify(getBlockchain()))
})

app.listen(PORT, () => {
  console.log(`Server is running locally`)
})

export default app