import React from 'react'
import { connect } from 'react-redux'
import { getAllAccounts, getAccount } from '../reducers/accounts'
import AddressDropdown from '../components/AddressDropdown'
import { selectFromAddress,  getAllIdentities, addPrescriptionDispatcher, setSelectedDoctorAddress } from '../actions'
import sha256_wrapper from '../crypto';
var pd = require('probability-distributions');
var QRCode = require('qrcode-svg');
import DrugList from '../assets/DrugList';
import QrReader from 'react-qr-reader'

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


class PrescriptionFormContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            delay: 100,
            drName: null,
            drLocation: null,
        }
    }

    render(){

        let {prescription, selectedDoctorAddress, accounts} = this.props;
        let {qrCodeData} = prescription;

        console.log('props: ', this.props);

        let account = accounts.find((acc) => {
            return !!(acc && acc.address && acc.address == selectedDoctorAddress);
        });

        console.log('account: ', account);

        //console.log('accounts: ', accounts);

        const previewStyle = {
            height: 240,
            width: 320,
        }


        return (
            <div className="container">
                <div className="row">

                    <div className="col-sm-12" style={{textAlign:'center', marginBottom:'10px'}}>
                        <h1>{this.state.drName}</h1>
                        <h3>{this.state.drLocation}</h3>
                    </div>

                </div>

                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3"
                         style={{textAlign:'center', border: '1px solid #777777'}}
                         ref={(c) => {this.qrCodeContainer = c;}}>

                    </div>
                </div>
            </div>
        )
    }


    selectIdentity(){
        //console.log('selectIdentity()');
        //let elem = this.doctorInput;
        //let selectedOption = elem.options[elem.selectedIndex];
        //let key = selectedOption.getAttribute("data-key");
        //if(key && key.length){
        //    this.props.setSelectedDoctorAddress(key);
        //}
    }


    componentDidMount(){
        let {prescription, selectedDoctorAddress, accounts} = this.props;

        let account = accounts.find((acc) => {
            return !!(acc && acc.address && acc.address == selectedDoctorAddress);
        });
        //console.log('account: ', account);

        this.setState({
            drName: account.name,
            drLocation: account.location,
        });

        let {qrCodeData} = this.props.prescription;
        var qrcode = new QRCode(qrCodeData);
        var svg = qrcode.svg();
        this.qrCodeContainer.innerHTML = svg;
    }
}

const mapStateToProps = state => ({
    //accounts: getAllAccounts(state.accounts),
    prescription: state.prescription,
    selectedDoctorAddress: state.accounts.selected.selectedDoctorAddress,
    accounts: getAllAccounts(state.accounts),
})

export default connect(
    mapStateToProps,
    //{ getAllIdentities, addPrescriptionDispatcher, setSelectedDoctorAddress }
)(PrescriptionFormContainer)
