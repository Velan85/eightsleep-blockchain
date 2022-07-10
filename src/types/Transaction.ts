export type Transaction = {
  sender: string
  recipient: string
  amount: number
}

export type TransactionQuery = {
  query: Transaction
}