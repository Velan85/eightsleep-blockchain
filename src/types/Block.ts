import type { Transaction } from './Transaction'

export type Block = {
  timestamp: string
  transactions?: Transaction[]
  prevHash: string
  hash: string
  nonce: number
}

export type BlockParams = {
  timestamp: string
  transactions?: Transaction[]
  prevHash?: string
  nonce?: number
}

export type MineParams = {
  timestamp: string
  transactions: Transaction[]
  prevHash: string
}

export type MineOutput = {
  nonce: number
  hash: string
}