
import { Block } from 'Block'
import { mine } from './block'
import { getLastBlock } from './blockchain'
import { getPendingTransactions, clearCurrentTransactions } from './transactions'

export default (): Block => {

  const prevHash =  getLastBlock().hash
  const timestamp = Date.now().toString()
  const transactions = getPendingTransactions()

  // console.log('Transactions', transactions)

  // // Block is generated so we clear pending transactions
  // // New transactions, while the block is mined are deffered to the next block
  // // Not sure this is right
  clearCurrentTransactions()

  const { nonce, hash } = mine({
    prevHash,
    timestamp,
    transactions
  })

  console.log({
    prevHash,
    timestamp,
    transactions,
    nonce,
    hash
  })

  return {
    prevHash,
    timestamp,
    transactions,
    nonce,
    hash
  }
}
