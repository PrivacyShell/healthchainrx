import { combineReducers } from 'redux'

export const SHOW_PRESCRIPTION_QR = 'SHOW_PRESCRIPTION_QR'

const prescription = (state = {}, action) => {
  switch (action.type) {
    case SHOW_PRESCRIPTION_QR:
      return {
        ...state,
        dateIssued: action.prescription.dateIssued,
        expiresInDays: action.prescription.expiresInDays,
        hash: action.prescription.hash
      }
    default:
      return state
    }
}

export default prescription
