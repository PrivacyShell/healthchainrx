import React from 'react'
import { connect } from 'react-redux'
import { getAllAccounts } from '../reducers/accounts'
import AddressDropdown from '../components/AddressDropdown'
import { selectFromAddress,  getAllIdentities} from '../actions'
import sha256_wrapper from '../crypto';
var pd = require('probability-distributions');

import DrugList from '../assets/DrugList';

const $ = window.$;

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


class DoctorContainer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

    let {accounts, identities, getAllIdentities} = this.props;

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

                  <form>
                    <div className="form-group">
                      <label for="patient-name-input">Name</label>
                      <input type="text"
                             ref={(c) => {this.nameInput = c;}}
                             className="form-control"
                             id="patient-name-input"
                             placeholder="Name"/>
                    </div>
                    <div className="form-group">
                      <label for="patient-dob-input">Date of Birth</label>
                      <input type="text"
                             ref={(c) => {this.dobInput = c;}}
                             className="form-control"
                             id="patient-dob-input"
                             placeholder="Date of Birth"/>
                    </div>
                    <div className="form-group">
                      <label for="patient-healthcard-input">Health Card #</label>
                      <input type="text"
                             ref={(c) => {this.healthCardInput = c;}}
                             className="form-control"
                             id="patient-healthcard-input"
                             placeholder="HealthCard #"/>
                    </div>
                    <div className="form-group">
                      <label for="patient-prescription-input">Prescription</label>
                      <input type="text"
                             ref={(c) => {this.prescriptionInput = c;}}
                             className="form-control"
                             id="patient-prescription-input"
                             placeholder="Prescription"/>
                    </div>
                    <div className="form-group">
                      <label for="patient-prescription-instructions-input">Instructions</label>
                      <textarea type="text"
                             ref={(c) => {this.instructionsInput = c;}}
                             className="form-control"
                             id="patient-prescription-instructions-input"
                             placeholder="Instructions">

                      </textarea>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox"
                               ref={(c) => {this.sendSmsCheckbox = c;}}
                               id="send-sms-checkbox"
                               defaultChecked={true}/> Send SMS
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox"
                               ref={(c) => {this.printCheckbox = c;}}
                               id="print-checkbox"
                               defaultChecked={true}/> Print
                      </label>
                    </div>
                    <button type="submit"
                            onClick={(...args) => this.onClickPrescribe(...args)}
                            className="btn btn-success">
                      Prescribe
                    </button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
    )


  }

  onClickPrescribe(evt, two){
    evt.stopPropagation();
    evt.preventDefault();

    let formValues = {
      name: this.nameInput.value,
      dob: this.dobInput.value,
      healthCard: this.healthCardInput.value,
      prescriptionInput: this.prescriptionInput.value,
      instructionsInput: this.instructionsInput.value,
      sendSmsCheckbox: this.sendSmsCheckbox.checked,
      printCheckbox: this.printCheckbox.checked,
    };

    let encoded = JSON.stringify(formValues);
    encoded += pd.prng(32);
    
    sha256_wrapper(encoded, (hash) => {
      console.log('sha256 hash: ', hash);
    })




  }


  componentDidMount(){
    var $datePicker = $("#patient-dob-input").datetimepicker();
    var $input = $("#patient-prescription-input");
    $input.typeahead({
      source: DrugList,
      autoSelect: true
    });
    $input.change(function() {
      var current = $input.typeahead("getActive");
      if (current) {
        // Some item from your model is active!
        if (current.name == $input.val()) {
          // This means the exact match is found. Use toLowerCase() if you want case insensitive match.
        } else {
          // This means it is only a partial match, you can either add a new item
          // or take the active if you don't want new items
        }
      } else {
        // Nothing is active so it is a new value (or maybe empty value)
      }
    });
  }
}

const mapStateToProps = state => ({
  accounts: getAllAccounts(state.accounts),
  identities: state.identities
})

export default connect(
  mapStateToProps,
  { getAllIdentities }
)(DoctorContainer)
