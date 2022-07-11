
import generateBlock, { genesisBlock, verifyBlock, adjustDifficulty } from './block'
import { clearCurrentTransactions } from './transactions'
import type { Block } from './types/Block'

// A miner gets 100 coins when it successfully mines a block
const REWARD = 100

// Initialize the blockchain and create the first block
let chain: Block[] = [
  genesisBlock()
]

export const addBlock = (block: Block) => {
  chain = [...chain, block]

  // clearCurrentTransactions()
  adjustDifficulty(chain[chain.length - 1])
}

/*
  Verifies if every block's prevHash matches the previous block's hash value
  If they don't match, the blockchain is invalid or has been tempered with
  The genesis block is exluded as there is no previous block
*/
const blockchainIsValid = (): boolean => {
  for(let i = 1; i < chain.length; i++) {
    const block = chain[i]
    const previousBlock = chain[i - 1]

    if (!verifyBlock(block) || block.prevHash !== previousBlock.hash) {
      return false
    }
  }

  return true
}

export const getAmountPerClient = (client: string): number => {
  return chain.reduce((amount, block) => {
    return block.transactions.reduce((blockAmount, transaction) => {
      if(transaction.sender === client) {
        return blockAmount - transaction.amount
      }

      if(transaction.recipient === client) {
        return blockAmount + transaction.amount
      }

      return blockAmount
    }, amount)
  }, 0)
}

export const getLastBlock = (): Block => {
  return chain[chain.length - 1]
}

export const getBlockchain = (): Block[] => chain

