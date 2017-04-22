import { combineReducers } from 'redux'

export const SHOW_SUCCESS = 'SHOW_SUCCESS'
export const SHOW_ERROR = 'SHOW_ERROR'

const dispenser = (state = {}, action) => {
  debugger
  switch (action.type) {
    case SHOW_SUCCESS:
      return {
        ...state,
        type: "success",
        status: action.dispenser.status
      }
      case SHOW_ERROR:
        return {
          ...state,
          type: "error",
          status: action.dispenser.status
        }
    default:
      return state
    }
}

export default dispenser
