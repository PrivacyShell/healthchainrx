import Web3 from 'web3'
import { default as contract } from 'truffle-contract'
// Import our contract artifacts and turn them into usable abstractions.
import artifacts from '../../build/contracts/HealthChainRx.json'

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var HealthChainRx = contract(artifacts);

// Bootstrap the MetaCoin abstraction for Use.
HealthChainRx.setProvider(web3.currentProvider);

export const getIdentities = async () => {
  let healthChainRx = await HealthChainRx.deployed()
  //console.log(healthChainRx.getOwner())
  let ids = await healthChainRx.getIdentities.call()
  console.log(ids)
  return ids

  // HealthChainRx.deployed().then(instance => {
  //   return instance.getOwner()
  // })
}

export const addIdentity = async (name, location) => {
  let healthChainRx = await HealthChainRx.deployed()

  let success = await healthChainRx.addIdentity(name, location, {from: web3.eth.coinbase})
  console.log(`success ${success}`)
  let theName = await healthChainRx.getIdentity.call(web3.eth.coinbase)
  console.log(theName)
}

export const addPrescription = async (dateIssued, expiresInDays, hash, docAddress) => {
  let healthChainRx = await HealthChainRx.deployed()

  console.log("has is " + hash)
  console.log("It is type " + typeof hash)

  let success = await healthChainRx.addPrescription(expiresInDays, hash, {from: docAddress, gas: 500000})
}


export const verifyPrescription = async (hash) => {
  let healthChainRx = await HealthChainRx.deployed()

  let status = await healthChainRx.getPrescriptionStatus.call(hash)
  return status
}
