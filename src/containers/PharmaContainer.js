import React from 'react'
import { connect } from 'react-redux'
import { getAllAccounts } from '../reducers/accounts'
import AddressDropdown from '../components/AddressDropdown'
import { verifyPrescriptionDispatcher} from '../actions'

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

class PharmaContainer extends React.Component {

  render(){

    let { accounts, verifyPrescriptionDispatcher } = this.props;

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

                  <div className="form-group">
                    <label htmlFor="pharma-input">Doctor</label>
                  <AddressDropdown id="pharam-input"
                    accounts={accounts} />
                  </div>
                    <div className="form-group">
                      <label htmlFor="patient-name-input">Name</label>
                      <input type="text"
                             ref={(c) => {this.nameInput = c;}}
                             className="form-control"
                             id="patient-name-input"
                             placeholder="Name"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="patient-dob-input">Date of Birth</label>
                      <input type="text"
                             ref={(c) => {this.dobInput = c;}}
                             className="form-control"
                             id="patient-dob-input"
                             placeholder="Date of Birth"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="patient-healthcard-input">Health Card #</label>
                      <input type="text"
                             ref={(c) => {this.healthCardInput = c;}}
                             className="form-control"
                             id="patient-healthcard-input"
                             placeholder="HealthCard #"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="patient-prescription-input">Prescription</label>
                      <input type="text"
                             ref={(c) => {this.prescriptionInput = c;}}
                             className="form-control"
                             id="patient-prescription-input"
                             placeholder="Prescription"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="patient-prescription-instructions-input">Instructions</label>
                      <textarea type="text"
                             ref={(c) => {this.instructionsInput = c;}}
                             className="form-control"
                             id="patient-prescription-instructions-input"
                             placeholder="Instructions">

                      </textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="nonce-input">Nonce</label>
                      <input type="text"
                             ref={(c) => {this.nonceInput = c;}}
                             className="form-control"
                             id="nonce-input"
                             placeholder="Nonce"/>
                    </div>
                    <button onClick={() => {verifyPrescriptionDispatcher()}}>Verify</button>

                </div>
              </div>
            </div>
          </div>
        </div>
    )

}
}


  const mapStateToProps = state => ({
    accounts: getAllAccounts(state.accounts),
    dispenser: state.dispenser
  })

  export default connect(
    mapStateToProps,
    { verifyPrescriptionDispatcher }
  )(PharmaContainer)
