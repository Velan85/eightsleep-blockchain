
# Description

# Features
- Simple blockchain
  - 
- Clients communicating with the blockchain
- Clients communicating with each other (transferring coins)
- Clients can drop or join

# Considered features
- Adjustable difficulty depending on the number of clients
- Check if a client has enough coins to spend

## Properties of a proof-of-work blockchain
- The problem must be hard to solve and easy to verify
- There is no central authority to verify the blockchain, we trust the majority of clients relative to their processing power

## How does proof-of-work actually work?
- A new block is ready to be added to the blockchain, the block is defined by:
  - The hash of the previous block
  - The timestamp
  - The data in the block
- To validate the block we need to find a number, add it to the block and hash the block with SHA256.
- The resulting hash needs to start with a certain amount of `0`s.
```js
  SHA256(prevHash + timestamp + JSON.stringify(data) + nonce)
```

This makes it possible to make sure that a block is created periodically, for instance the bitcoin blockchain aims to create a block every 10mns.

If the processing power increases or decreases, the difficulty can be adjusted to generate a hash with more or less 0s, making sure that a block is still generated in about the same time.

# Getting started
- Install [Node.js 18](https://nodejs.org) 
- Clone the repository
- Install dependencies
```sh
yarn install
```
- Build & run
```sh
yarn start
```
- Run tests
```sh
yarn test
```
