import { createHash } from 'crypto'
// import url from 'url'

import type { Block, BlockParams } from './types/Block'
import type { Transaction } from 'Transaction'

// Wanted time between 2 blocks (10s)
const BLOCKTIME = 100000
let difficulty = 4

const generateHash = ({prevHash, timestamp, transactions, nonce}: BlockParams): string => {
  return createHash('sha256').update(
    prevHash + timestamp + JSON.stringify(transactions) + nonce
  ).digest('hex')
}

export const genesisBlock = (): Block => {
  return generateBlock({
    timestamp: Date.now().toString(),
    transactions: [],
    prevHash: '0',
    nonce: 0
  })
}

/* Regenerates a block and verifies the hash is the same */
export const verifyBlock = (block: Block) => {
  const newHash = generateHash(block)

  return block.hash === newHash
}

/*
  Mining, we're generating hashes until one starts with enough
  0s to match the difficulty and we're upating the nonce value until
  that hash is found
*/
export const mine = ({
  prevHash, timestamp, transactions
}: Block): number => {
  const leadingZeros = Array(difficulty + 1).fill(0).join('')
  let nonce = 0

  // Infinite loop, until the hash is found
  while (true) {
    const hash = generateHash({
      prevHash, timestamp, transactions, nonce
    })

    if(hash.startsWith(leadingZeros)) {
      return nonce
    }
  }
}

const generateBlock = ({
  timestamp,
  transactions,
  prevHash,
  nonce
}: BlockParams): Block => {
  const hash = generateHash({
    prevHash,
    timestamp,
    transactions,
    nonce
  })

  return {
    timestamp,
    transactions,
    prevHash,
    hash,
    nonce
  }
}

export const adjustDifficulty = (previousBlock: Block) => {
  const currentTime = Date.now()
  const previousBlockTime = parseInt(previousBlock.timestamp)

  if(currentTime - previousBlockTime < BLOCKTIME) {
    difficulty = difficulty + 1
  }

  if(currentTime - previousBlockTime > BLOCKTIME) {
    difficulty = difficulty - 1
  }
}


export default generateBlock
