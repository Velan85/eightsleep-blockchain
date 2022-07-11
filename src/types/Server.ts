import type { Transaction } from './Transaction'

type SendCoinsMessage = {
  type: 'SEND_COINS'
  sender: string
  recipient: string
  amount: number
}

type CreateWalletMessage = {
  type: 'CREATE_WALLET'
}

type AddBlockMessage = {
  type: 'ADD_BLOCK'
  hash: string
  transactions: Transaction[]
  prevHash: string
  nonce: number
}

type GetBlockchainMessage = {
  type: 'GET_BLOCKCHAIN'
}

type GetBalanceMessage = {
  type: 'GET_BALANCE'
  wallet: string
}

export type Message = 
  SendCoinsMessage |
  CreateWalletMessage |
  AddBlockMessage |
  GetBlockchainMessage |
  GetBalanceMessage

export type SendCoins = 
  (params: { sender: string, recipient: string, amount: number }) => void

export type CreateWallet = () => { wallet: string }
