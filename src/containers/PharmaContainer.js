import React from 'react'
import { connect } from 'react-redux'
import { getAllAccounts } from '../reducers/accounts'
import AddressDropdown from '../components/AddressDropdown'
import { verifyPrescriptionDispatcher, dispenseDispatcher, setSelectedPharmaAddress, ackErrorDispatcher} from '../actions'
import QrReader from 'react-qr-reader'
import sha256_wrapper from '../crypto';
var mortarPestleImage = require('../img/MortarPestle.jpg');
var checkmarkImage = require('../img/checkmark.png');
const $ = window.$;

import PharmaWarningModal from '../components/modal/PharmaWarningModal';

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
      modalVisible: false,
      modalMessage: 'There is a problem with the prescription...',
    }
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  render(){

    let { accounts, transactions, messenger, verifyPrescriptionDispatcher, dispenseDispatcher } = this.props;

    const previewStyle = {
      height: 240,
      width: 320,
    }

    const buttonStyle = {
      height: "40px",
      lineHeight: "20px",
      fontSize: "20px",
      background: "#FFFFFF",
      marginRight: "12px",
      padding: "5px",
      borderRadius: "6px",
      border: "2px solid #888",
      fontFace: "Roboto, sans-serif"
    }

    let pharmaArray = accounts.filter(el => {
      return el.category == 'pharma'
    })

    return (
        <div className="container">
          <div className="row">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3>Pharmacy</h3>

                <select className="form-control"
                        ref={(c) => {this.pharmaInput = c;}}
                        onChange={(...args) => this.selectIdentity(...args)}>
                  <option data-key={null}>Select Pharmacy</option>
                  {pharmaArray.map((account) => {
                    return (
                        <option data-key={account.address}>{account.name}</option>
                    )
                  })}
                </select>

              </div>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-sm-6">

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
                             value="04/23/2017"
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
                    <button  style={buttonStyle} onClick={(...args) => this.onClickVerify(...args)}>
                      Verify
                      <img src={checkmarkImage} style={{height: "16px"}} />
                    </button>

                    <button style={buttonStyle} onClick={(...args) => this.onClickDispense(...args)}>
                      Dispense{' '}
                      <img src={mortarPestleImage} style={{width: "16px"}} />
                    </button>

                </div>

                <div className="col-sm-6">
                  <div className="row qr-reader-row">
                    <QrReader
                        delay={this.state.delay}
                        style={previewStyle}
                        onError={this.handleError}
                        onScan={this.handleScan}
                    />
                    <br />
                    <br />
                    <Receipt transactions={transactions} />
                  </div>

                </div>

                </div>
            </div>
          </div>

          <PharmaWarningModal visible={this.state.modalVisible}
                              onModalHidden={() => {this.setState({modalVisible: false, modalMessage: ''}); }}
                              message={this.state.modalMessage}
          />

        </div>
    )
  }

  selectIdentity(){
    console.log('selectIdentity()');
    let elem = this.pharmaInput;
    let selectedOption = elem.options[elem.selectedIndex];
    let key = selectedOption.getAttribute("data-key");
    if(key && key.length){
      this.props.setSelectedPharmaAddress(key);
    }
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
    let decoded = null;
    try{
      decoded = JSON.parse(data);
    }catch(err){
      this.setState({
        modalMessage: 'There was an error parsing the QR code',
        modalVisible: true,
      });
    }

    if(decoded){
      let {n,p,i} = decoded;

      if(n && p && i){
        this.setState({
          prescriptionValue: p,
          instructionValue: i,
          nonceValue: n,
        });
      } else {
        this.setState({
          modalMessage: 'There was an error parsing the QR code',
          modalVisible: true,
        });
      }
    }


  }

  componentWillReceiveProps(nextProps, nextState) {
    if(nextProps.messenger.type=="error" || (this.state.modalMessage != '' && this.props.messenger.message != nextProps.messenger.message)) {
      this.setState({
        modalVisible: true,
        modalMessage: nextProps.messenger.message
      })
    }
  }

  handleError(err){
    console.error(err)
  }

  componentDidMount(){
    var $datePicker = $("#patient-dob-input").datetimepicker({
      format: 'MM/DD/YYYY',
    });
  }
}

class Receipt extends React.Component{
  render() {
    let transactions = this.props.transactions;
    let step1 = '';
    let step2 = '';

    if(transactions && transactions[0]) {
      step1 = "Submitting to block with tx " + transactions[0].hash.slice(-10);

      if(transactions[0].receipt) {
        step2 = "Mined into block " + transactions[0].receipt.blockNumber;
      }
    }



    return (
        <div>
          <h3>Status of prescription</h3>
          {step1}
          <br />
          {step2}
        </div>
    )
  }
}


const mapStateToProps = state => ({
  accounts: getAllAccounts(state.accounts),
  dispenser: state.dispenser,
  transactions: state.transactions,
  messenger: state.messenger
})

export default connect(
  mapStateToProps,
  { verifyPrescriptionDispatcher, dispenseDispatcher, setSelectedPharmaAddress, ackErrorDispatcher }
)(PharmaContainer)
