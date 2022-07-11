
# Description
A naive blockchain implementation in javascript

# Features
- Simple blockchain
- Clients communicating with the blockchain
- Clients communicating with each other (transferring coins)
- Clients can drop or join
- Awarding coins to a random connected client one a block is mined
- Adjustable difficulty depending on the time it took to mine the previous block compared to the expected time

# Considered features
- Check if a client has enough coins to spend
- Actual p2p connection between clients, currently clients mine on the main server and have to communicate with that server to perform transactions
- Adding more integration tests to test the websocket implementation

## Properties of a proof-of-work blockchain
- The problem must be hard to solve and easy to verify
- There is no central authority to verify the blockchain, we trust the majority of clients relative to their processing power

## How does proof-of-work actually work?
- A new block is ready to be added to the blockchain, the block is defined by:
  - The hash of the previous block
  - The timestamp
  - The data in the block
  - The nonce value, which is a number generated iteratively to modify the resulting hash
- To validate the block we need to find a number, add it to the block and hash the block with SHA256.
- The resulting hash needs to start with a certain amount of `0`s.
```js
  SHA256(prevHash + timestamp + JSON.stringify(data) + nonce)
```

This makes it possible to make sure that a block is created periodically, for instance the bitcoin blockchain aims to create a block every 10 minutes.

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

# Communicating with the server

I used Postman to connect to the server via websocket, send and receive messages

![Postman](https://user-images.githubusercontent.com/107947310/178341365-1bbb1004-7b77-4536-bad1-651046460694.png)
