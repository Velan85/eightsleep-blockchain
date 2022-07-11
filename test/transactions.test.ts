import {createTransaction, getPendingTransactions, clearCurrentTransactions } from '../src/transactions'
import { expect } from 'chai'

beforeEach(clearCurrentTransactions)

describe('createTransaction', () => {
  it('should generate a transaction and add it to the pending queue', () => {
    createTransaction({
      sender: '',
      amount: 100,
      recipient: ''
    })

    expect(getPendingTransactions()[0]).to.deep.equal({
      sender: '',
      amount: 100,
      recipient: ''
    })
  })
})

describe('getPendingTransactions', () => {
  it('should return all the pending transactions', () => {
    createTransaction({
      sender: 'a',
      amount: 100,
      recipient: 'b'
    })

    createTransaction({
      sender: 'b',
      amount: 110,
      recipient: 'a'
    })


    expect(getPendingTransactions().length).to.equal(2)
    expect(getPendingTransactions()[0]).to.deep.equal({
      sender: 'a',
      amount: 100,
      recipient: 'b'
    })
    expect(getPendingTransactions()[1]).to.deep.equal({
      sender: 'b',
      amount: 110,
      recipient: 'a'
    })
  })
})

describe('clearCurrentTransactions', () => {
  it('should clear all pending transactions', () => {
    createTransaction({
      sender: 'a',
      amount: 100,
      recipient: 'b'
    })

    createTransaction({
      sender: 'b',
      amount: 110,
      recipient: 'a'
    })

    expect(getPendingTransactions().length).to.equal(2)
    clearCurrentTransactions()
    expect(getPendingTransactions().length).to.equal(0)
  })
})
