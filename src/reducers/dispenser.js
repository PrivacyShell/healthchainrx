import { combineReducers } from 'redux'

export const SHOW_SUCCESS = 'SHOW_SUCCESS'
export const SHOW_ERROR = 'SHOW_ERROR'
export const DISPENSE = 'DISPENSE'

const dispenser = (state = {}, action) => {
  switch (action.type) {
    case SHOW_SUCCESS:
      return {
        ...state,
        type: "success",
        status: action.status
      }
      case SHOW_ERROR:
        return {
          ...state,
          type: "error",
          status: action.status
        }
        case DISPENSE:
          return {
            ...state,
            dispensed: action.status
          }
    default:
      return state
    }
}

export default dispenser
