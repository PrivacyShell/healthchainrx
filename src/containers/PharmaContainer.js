import React from 'react'
import { connect } from 'react-redux'
import { getAllAccounts } from '../reducers/accounts'
import AddressDropdown from '../components/AddressDropdown'
import { verifyPrescriptionDispatcher, dispenseDispatcher} from '../actions'
import QrReader from 'react-qr-reader'
import sha256_wrapper from '../crypto';

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

  constructor(props){
    super(props);
    this.state = {
      delay: 100,
      prescriptionValue: null,
      instructionValue: null,
      nonceValue: null,
    }
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  render(){

    let { accounts, verifyPrescriptionDispatcher, dispenseDispatcher } = this.props;

    const previewStyle = {
      height: 240,
      width: 320,
    }

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
                             value="Dave"
                             className="form-control"
                             id="patient-name-input"
                             placeholder="Name"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="patient-dob-input">Date of Birth</label>
                      <input type="text"
                             ref={(c) => {this.dobInput = c;}}
                             value="04/22/2017 12:00 AM"
                             className="form-control"
                             id="patient-dob-input"
                             placeholder="Date of Birth"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="patient-healthcard-input">Health Card #</label>
                      <input type="text"
                             ref={(c) => {this.healthCardInput = c;}}
                             value="123"
                             className="form-control"
                             id="patient-healthcard-input"
                             placeholder="HealthCard #"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="patient-prescription-input">Prescription</label>
                      <input type="text"
                             ref={(c) => {this.prescriptionInput = c;}}
                             className="form-control"
                             value={this.state.prescriptionValue}
                             id="patient-prescription-input"
                             placeholder="Prescription"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="patient-prescription-instructions-input">Instructions</label>
                      <textarea type="text"
                             ref={(c) => {this.instructionsInput = c;}}
                             className="form-control"
                              value={this.state.instructionValue}
                              id="patient-prescription-instructions-input"
                             placeholder="Instructions">

                      </textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="nonce-input">Nonce</label>
                      <input type="text"
                             ref={(c) => {this.nonceInput = c;}}
                             className="form-control"
                             value={this.state.nonceValue}
                             id="nonce-input"
                             placeholder="Nonce"/>
                    </div>
                    <button onClick={(...args) => this.onClickVerify(...args)}>Verify</button>
                    <button onClick={(...args) => this.onClickDispense(...args)}>Dispense</button>

                </div>

                <div className="col-sm-6">
                  <div className="row">
                    <QrReader
                        delay={this.state.delay}
                        style={previewStyle}
                        onError={this.handleError}
                        onScan={this.handleScan}
                    />
                  </div>

                </div>

                </div>
            </div>
          </div>
        </div>
    )
  }

  onClickVerify(){
    let formValues = {
      name: this.nameInput.value,
      dob: this.dobInput.value,
      healthCard: this.healthCardInput.value,
      prescription: this.prescriptionInput.value,
      instructions: this.instructionsInput.value,
    };

    let nonce = this.nonceInput.value;


    let encoded = JSON.stringify(formValues);
    encoded += nonce;

    sha256_wrapper(encoded, (hash) => {
      console.log('sha256 hash PHARMA: ', hash);
      let result = this.props.verifyPrescriptionDispatcher(hash);
      console.log('verifyPrescriptionDispatcher RESULT: ', result);
    })
  }

  onClickDispense(){
    let formValues = {
      name: this.nameInput.value,
      dob: this.dobInput.value,
      healthCard: this.healthCardInput.value,
      prescription: this.prescriptionInput.value,
      instructions: this.instructionsInput.value,
      //sendSmsCheckbox: this.sendSmsCheckbox.checked,
      //printCheckbox: this.printCheckbox.checked,
    };

    let nonce = this.nonceInput.value;


    let encoded = JSON.stringify(formValues);
    encoded += nonce;

    sha256_wrapper(encoded, (hash) => {
      console.log('sha256 hash PHARMA: ', hash);
      let result = this.props.dispenseDispatcher(hash);
      console.log('verifyPrescriptionDispatcher RESULT: ', result);
    })
  }

  handleScan(data){
    let decoded = JSON.parse(data);
    let {n,p,i} = decoded;

    this.setState({
      prescriptionValue: p,
      instructionValue: i,
      nonceValue: n,
    });
  }

  handleError(err){
    console.error(err)
  }

}


  const mapStateToProps = state => ({
    accounts: getAllAccounts(state.accounts),
    dispenser: state.dispenser
  })

  export default connect(
    mapStateToProps,
    { verifyPrescriptionDispatcher, dispenseDispatcher }
  )(PharmaContainer)
