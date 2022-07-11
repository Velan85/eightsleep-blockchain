import { addBlock, getAmountPerClient, getLastBlock, getBlockchain, blockchainIsValid } from '../src/blockchain'
import { expect } from 'chai'

describe('getBlockchain', () => {
  it('should get a blockchain with the genesis block', (done) => {
    const blockchain = getBlockchain()

    expect(blockchain.length).to.equal(1)
    expect(blockchain[0].transactions).to.be.empty
    expect(blockchain[0].prevHash).to.equal('0')
    expect(blockchain[0].nonce).to.equal(0)
    
    done()
  })

  it('should return blocks as they are inserted', () => {
    // Genesis block is inserted when the script first runs
    expect(getBlockchain().length).to.equal(1)

    addBlock({
      timestamp: Date.now().toString(),
      transactions: [],
      prevHash: '',
      hash: '',
      nonce: 0
    })

    expect(getBlockchain().length).to.equal(2)

    addBlock({
      timestamp: Date.now().toString(),
      transactions: [],
      prevHash: '',
      hash: '',
      nonce: 0
    })

    expect(getBlockchain().length).to.equal(3)
  })
})

describe('getLastBlock', () => {
  it('should return the last block', () => {
    const block = {
      timestamp: '1657563408596',
      transactions: [{ sender: '', amount: 100, recipient: '' }],
      prevHash: '',
      hash: '',
      nonce: 0
    }

    addBlock(block)

    const blockchain = getBlockchain()
    const lastBlock = getLastBlock()

    expect(blockchain[blockchain.length - 1]).to.deep.equal(lastBlock)
  })
})


describe('addBlock', () => {
  it('should add a new block to the blockchain', (done) => {
    const blockchainInitialLength = getBlockchain().length

    addBlock({
      timestamp: '1657563408596',
      transactions: [{ sender: '', amount: 100, recipient: '' }],
      prevHash: '',
      hash: '',
      nonce: 0
    })

    expect(getBlockchain().length - blockchainInitialLength).to.equal(1)
    done()
  })
})

describe('blockchainIsValid', () => {

  it('should return false if a block does not reference the previous block', (done) => {
    addBlock({
      timestamp: '1657563408596',
      transactions: [],
      prevHash: '',
      hash: 'a',
      nonce: 0
    })
    addBlock({
      timestamp: '1657563408596',
      transactions: [],
      prevHash: 'b',
      hash: '',
      nonce: 0
    })
    expect(blockchainIsValid()).to.equal(false)
    done()
  })
})

describe('getAmountPerClient', () => {

  it('should return a client\'s coins that were added to the blockchain', () => {
    addBlock({
      timestamp: '1657563408596',
      transactions: [{ sender: '', amount: 100, recipient: 'a' }],
      prevHash: '',
      hash: '',
      nonce: 0
    })
  
    expect(getAmountPerClient('a')).to.equal(100)

    addBlock({
      timestamp: '1657563408596',
      transactions: [{ sender: 'a', amount: 100, recipient: 'b' }],
      prevHash: '',
      hash: '',
      nonce: 0
    })
  })
})
