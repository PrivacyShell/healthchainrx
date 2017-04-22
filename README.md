# HOW TO

SCRIPT FOR ADDING FUNCTION TO SOLIDITY AND CONNECTING:

- Update the contract.sol to add the function
- run `truffle compile`
- run `truffle migrate`
- Go to `middleware/` and find corresponding javascript
	- Add corresponding JS function that accepts any data to go to the solidity contract function
- Got to 


# react-redux-dapp
This is a template project that can be used as the basis for an Ethereum Dapp.

<img src=docs/img/react-redux-dapp.png width="300">

# Prerequisites
You'll want to have the following installed globally

- [nodejs](https://nodejs.org/en/)
- [testrpc](https://github.com/ethereumjs/testrpc)
- [truffle v3.1.1+](http://truffleframework.com/)

# This is how to use it
In the project directory, run these commands:
```
 npm install
 npm start
```

# Environment
This is an overview of the development environment I use.

<img src=docs/img/dapp-dev-env.png width="300">


# General Redux Data Flows in react-redux-dapp
For reference, consider these depictions of generic redux flows taken from [ReachJS Issue #653](https://github.com/reactjs/redux/issues/653].

<img src=https://camo.githubusercontent.com/5aba89b6daab934631adffc1f301d17bb273268b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343535322f415243482d5265647578322d7265616c2e676966 width="300">

<img src=https://camo.githubusercontent.com/9de527b9432cc9244dc600875b46b43311918b59/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343739302f415243482d5265647578322d657874656e6465642d7265616c2d6465636c657261746976652e676966 width="300">

# Redux Data Flows in react-redux-dapp
This section describes the reducers, state model and actions used in the YAEE sample application included in this project.

## Reducers
The reducers maintain state

## Middleware

### Thunk
The [redux-thunk](https://github.com/gaearon/redux-thunk) middleware component is used to incercept the asynchronous server calls from `web3.filter()` events.

###
The [redux-logger](https://www.npmjs.com/package/redux-logger) middleware component provides clean logging of state before, actions and state after for debugging.


## State Model
The state model represents on-chain data including `accounts` and transactions `transactions` and off-chain data like the list of `cryptos` or tokens that can be transfered and `transfer` details captured from the view.

## Actions
The application state is initialized by calling actions `getAllAccounts`, `getCryptos` and `fetchTransactions`.  For now, `fetchTransactions` initalizes the `web3.filter()` to listen for the latest transacations.
