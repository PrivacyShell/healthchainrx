import React from 'react'
import { connect } from 'react-redux'
import { getAllAccounts } from '../reducers/accounts'
import AddressDropdown from '../components/AddressDropdown'
import { selectFromAddress,  getAllIdentities} from '../actions'

/* Fields
- Name - text
- DoB - datepicker
- Healthcard
- Notes textarea
- Drug details (dropdown)
- Notes
Prescribe button

QR Code (with print and/or send (via sms or email))
*/

const DoctorContainer = ({ accounts, identities, getAllIdentities }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>Doctor</h3>
          </div>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-horizontal">
              <AddressDropdown label="From" accounts={accounts} action={selectFromAddress} />
              <button onClick={getAllIdentities}>Push</button>
              <div>
                {JSON.stringify(identities)}
              </div>
              </div>
            </div>
        </div>
      </div>
      </div>
    </div>
    )
  }

  const mapStateToProps = state => ({
    accounts: getAllAccounts(state.accounts),
    identities: state.identities
  })

  export default connect(
    mapStateToProps,
    { getAllIdentities }
  )(DoctorContainer)
