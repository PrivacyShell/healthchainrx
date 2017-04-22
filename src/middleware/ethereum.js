/**
 * Ethereum service API
 */
import Web3 from 'web3'
import { getBalance, sendCoin } from './metacoin'
import identities from './identities'
import { addIdentity } from './HealthChainRx'

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

var identityDetails = [
  {"name": "Shoppers 23", "location": "1 King St. W"},
  {"name": "Shoppers 24", "location": "1 King St. W"},
  {"name": "Shoppers 25", "location": "1 King St. W" },
  {"name": "Shoppers 26", "location": "1 King St. W" },
  {"name": "Dr. James", "location": "1 King St. W" },
  {"name": "Dr. Bethell", "location": "1 King St. W" },
  {"name": "Dr. Malik Pula 28", "location": "1 King St. W" },
  {"name": "Dr. Paul McHardy", "location": "1 King St. W" },
  {"name": "Dr. Richard Winston", "location": "1 King St. W" },
  {"name": "Dr. Maria Mark", "location": "1 King St. W" }
]

export default {
  getAccounts: (cb) => {
    web3.eth.getAccounts(async function(error, addresses) {
      let _accounts = [];

      for (var i = 0; i < addresses.length; i++) {
        let eth = web3.fromWei(web3.eth.getBalance(addresses[i]), 'ether')
        _accounts.push({
          address: addresses[i],
          balance: eth,
          name: identityDetails[i].name,
          location: identityDetails[i].location,
          meta: await getBalance(addresses[i])
        })
        addIdentity(identityDetails[i].name, identityDetails[i].location)
      }
      cb(_accounts);

    })
  },
  transfer: (transaction) => {

    if (transaction.crypto === 'ETH') {
      const amount = web3.toWei(transaction.amount, "ether")

      return web3.eth.sendTransaction({from:transaction.from, to:transaction.to, value: amount})
    } else {
      return sendCoin(transaction)
    }
  }

}
