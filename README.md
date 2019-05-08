# 📚 Formation dApp 🔥
> This repo contains a minimalistic dApp. The goal is to provide the basic building bloc of a dApp.

⚠️ This dApp works only on the Goerli testnet !

This repo conatins :
- a `Greeter.sol` smart-contract
- Waffle tests for the contract
- a plain html/css page to interact with the contract (already deployed on Goerli at `0xe76fb0d4ed4094911a6d11f92c2d18d83813c07d`), the front-end can :
  - login with MetaMask
  - create new Wallet
  - import Wallet with mnemonic
  - interact with the Greeter smart-contract

## ✔️Prerquisties
- node js along with a functional [node-gyp](https://github.com/nodejs/node-gyp)

## 📥Installation
Open a terminal and type the following commands :
- clone or download this repo (`git clone https://github.com/pldespaigne/formation-dapp.git`)
- `cd formation-dapp`
- `npm i`
- `npm run dev`

You can now visit http://localhost:8080

## 🔎Test
- run `npm test`

## 👨🏼‍💻Author
- Pierre-Louis DESPAIGNE
    - [github](https://github.com/pldespaigne)
    - [twitter](https://twitter.com/pldespaigne)

## 📜License
This repo and its content is proteced by the [ISC](LICENSE.txt)