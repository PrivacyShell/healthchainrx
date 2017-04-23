import Web3 from 'web3'

export const SHOW_TRANSACTIONS = 'SHOW_TRANSACTIONS'
export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const UPDATE_TRANSACTIONS = 'UPDATE_TRANSACTIONS'

const transaction = (state, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        hash: action.transaction.tx
      }
    default:
      return state
  }
}

const transactions = (state = [], action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return [
        transaction(undefined, action),
          ...state
        ]
      case UPDATE_TRANSACTIONS:
      let copy = [].concat(action.data);
        return copy;
    default:
      return state
  }
}

export default transactions
