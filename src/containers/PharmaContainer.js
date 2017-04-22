import React from 'react'
import { connect } from 'react-redux'
import { getAllAccounts } from '../reducers/accounts'

/* Fields
- Name - text
- DoB - datepicker
- Healthcard
- (read QR code to fill following details)
  - Drug Name
  - Notes
Dispense button
Message space (error or success)
*/

const PharmaContainer = ({ something }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>Pharmacy</h3>
          </div>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-horizontal">
              </div>
            </div>
        </div>
      </div>
      </div>
    </div>
    )
  }

  const mapStateToProps = state => ({
    accounts: state.drDummy
  })

  export default connect(
    mapStateToProps,
    {  }
  )(PharmaContainer)
