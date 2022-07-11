import { generateHash, genesisBlock, verifyBlock, adjustDifficulty, mine } from '../src/block'
import { expect } from 'chai'


describe('generateHash', () => {
  it('should generate a hash', (done) => {
    expect(generateHash({
      prevHash: '',
      timestamp: '1657563408596',
      transactions: [],
      nonce: 0
    })).to.equal('63444fa26a66c2faea8ee4cce4c2c436313de3dd800e21dd5c681bade3dc959f')
    done()
  })

  it('should generate a different hash when a parameter chamges', (done) => {
    expect(generateHash({
      prevHash: '63444fa26a66c2faea8ee4cce4c2c436313de3dd800e21dd5c681bade3dc959f',
      timestamp: '1657563408596',
      transactions: [],
      nonce: 0
    })).to.not.equal('63444fa26a66c2faea8ee4cce4c2c436313de3dd800e21dd5c681bade3dc959f')
    done()
  })
})

describe('genesisBlock', () => {
  it('should generate a first block with no prevHash', (done) => {
    expect(genesisBlock().prevHash).to.equal('0')
    expect(genesisBlock().nonce).to.equal(0)
    expect(genesisBlock().transactions).to.be.empty
    done()
  })
})

describe('verifyBlock', () => {

})

describe('adjustDifficulty', () => {

})
