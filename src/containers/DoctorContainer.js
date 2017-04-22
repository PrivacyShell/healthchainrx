import React from 'react'
import { connect } from 'react-redux'
import { getAllAccounts } from '../reducers/accounts'
import AddressDropdown from '../components/AddressDropdown'
import { selectFromAddress } from '../actions'

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

const DoctorContainer = ({ accounts }) => {
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

              </div>
            </div>
        </div>
      </div>
      </div>
    </div>
    )
  }

  const mapStateToProps = state => ({
    accounts: getAllAccounts(state.accounts)
  })

  export default connect(
    mapStateToProps,
    {  }
  )(DoctorContainer)
