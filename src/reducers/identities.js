export const RECIEVE_IDENTITIES = 'RECIEVE_IDENTITIES'
export const ADD_IDENTITY = 'ADD_IDENTITY'

const identity = (state, action) => {
  switch (action.type) {
    case RECIEVE_IDENTITIES:
      return {
        name: action.identities
      }
    default:
      return state
  }
}

const identities = (state = [], action) => {
  switch (action.type) {
    case RECIEVE_IDENTITIES:
      return [
        identity(undefined, action),
          ...state
        ]
    default:
      return state
  }
}

export default identities
