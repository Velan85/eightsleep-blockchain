import type { Transaction } from 'Transaction'

/* Transactions that happened after the last block was mined */
let pendingTransactions: Transaction[] = []

export const createTransaction = ({
  sender,
  amount,
  recipient
}: Transaction) => {
  pendingTransactions = [...pendingTransactions, {
    sender,
    amount,
    recipient
  }]

  console.log(pendingTransactions)
}

/* Get pending transactions */
export const getPendingTransactions = (): Transaction[] => {
  return pendingTransactions
}

/* Clear pending transactions after a block has been mined */
export const clearCurrentTransactions = () => {
  pendingTransactions = []
}
