import WebSocket, { WebSocketServer } from 'ws'
import { createTransaction } from './transactions'
import { getBlockchain, getAmountPerClient, addBlock } from './blockchain'
import miner from './miner'
import { v4 } from 'uuid'

import type { Message, SendCoins, CreateWallet } from './types/Server'
import * as dotenv from 'dotenv'

dotenv.config()

const port = parseInt(process.env.PORT)
const reward = parseInt(process.env.REWARD)

const wss = new WebSocketServer({ port })

let clients: { [id: string]: WebSocket }[] = []

console.log(`WebSocket server is up on port ${port}`)

const createWallet: CreateWallet = () => {
  return { wallet: v4() }
}

const server = wss.on('connection', async (socket) => {
  socket.send(JSON.stringify(getBlockchain()))

  socket.on('message', (message: string) => {
    const parsedMessage: Message = JSON.parse(message)

    switch(parsedMessage.type) {
      case 'CREATE_WALLET':
        const wallet = createWallet()
        clients = [...clients, { [wallet.wallet]: socket }]
        socket.send(
          JSON.stringify(wallet)
        )
        break
      case 'SEND_COINS':
        createTransaction(parsedMessage)
        socket.send(
          JSON.stringify('Transaction Created')
        )
        break
      case 'GET_BALANCE':
        socket.send(
          JSON.stringify(
            { balance: getAmountPerClient(parsedMessage.wallet) }
          )
        )
        break
      case 'GET_BLOCKCHAIN':
        socket.send(
          JSON.stringify(getBlockchain())
        )
        break
    }
  })
})

const getRandomClient = () => {
  console.log(clients)
  return clients[Math.floor((Math.random() * clients.length))]
}

// Start mining
const miningProcess = () => {
  const block = miner()
  const rewardClient = getRandomClient() // get a random client

  console.log('New block', block)

  if(rewardClient) {
    console.log('New reward', {
      sender: '',
      amount: reward,
      recipient: Object.keys(rewardClient)[0]
    })

    // Award coins for mining the block to a random connected client
    createTransaction({
      sender: '',
      amount: reward,
      recipient: Object.keys(rewardClient)[0]
    })

    Object.values(rewardClient)[0].emit(
      JSON.stringify(
        { balance: getAmountPerClient(Object.keys(rewardClient)[0]) }
      )
    )
  }
  else {
    console.log('No client found')
    // We're still creating a transaction, but without any client
    createTransaction({
      sender: '',
      amount: reward,
      recipient: ''
    })
  }
  addBlock(block)

  // Recursively call the process again
  setTimeout(() => { miningProcess() }, 1000)
}

// Delaying the mining process so clients can connect
// The
miningProcess()
