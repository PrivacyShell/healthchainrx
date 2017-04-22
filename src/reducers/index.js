import { combineReducers } from 'redux'

import accounts from './accounts'
import transactions from './transactions'
import identities from './identities'

export default combineReducers({ accounts, identities, transactions })
