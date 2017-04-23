import React from 'react'
import { connect } from 'react-redux'
import { getAllAccounts } from '../reducers/accounts'
import AddressDropdown from '../components/AddressDropdown'
import { verifyPrescriptionDispatcher, dispenseDispatcher, setSelectedPharmaAddress} from '../actions'
var QRCode = require('qrcode-svg');
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

class FakeGenerator extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            delay: 100,
            prescriptionValue: null,
            instructionValue: null,
            nonceValue: null,
            modalVisible: false,
            modalMessage: 'There is a problem with the prescription...',
            qrCodeJson: null,
        }
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    render(){

        //let { accounts, verifyPrescriptionDispatcher, dispenseDispatcher } = this.props;

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

        //let pharmaArray = accounts.filter(el => {
        //    return el.category == 'pharma'
        //})

        //console.log('')

        return (
            <div className="container">
                <div className="row">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3>Fake Generator</h3>

                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="row">

                            <div className="col-sm-6">
                                <div className="row qr-reader-row">
                                    <QrReader
                                        delay={this.state.delay}
                                        style={previewStyle}
                                        onError={this.handleError}
                                        onScan={this.handleScan}
                                    />

                                    <textarea ref={(c) => {this.textArea = c;}}>
                                        {this.state.qrCodeJson}
                                    </textarea>

                                    <button onClick={(...args) => this.onClickGenerate(...args)}>
                                        GENERATE
                                    </button>

                                </div>

                            </div>

                            <div className="col-sm-6">
                                <div className="row"
                                     ref={(c) => {this.qrCodeContainer = c;}}
                                     id="generated-qr-code">


                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }

    showModal(show = true){
        $('#warning-modal').modal({
            show: show,
        })
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

        let currentVisible = this.state.modalVisible;
        this.setState({
            modalVisible: !currentVisible,
        });

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


    onClickGenerate(evt){
        let jsonValue = this.textArea.value;
        console.log('JSON VALUE: ', jsonValue);

        var qrcode = new QRCode(jsonValue);
        var svg = qrcode.svg();
        this.qrCodeContainer.innerHTML = svg;


    }

    handleScan(data){
        console.log('handleScan: ', data);
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

            console.log('DECODED: ', decoded);

            this.textArea.value = data;

            //this.setState({
            //    qrCodeJson: data,
            //})

            //
            //if(n && p && i){
            //    this.setState({
            //        prescriptionValue: p,
            //        instructionValue: i,
            //        nonceValue: n,
            //    });
            //} else {
            //    this.setState({
            //        modalMessage: 'There was an error parsing the QR code',
            //        modalVisible: true,
            //    });
            //}
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


//const mapStateToProps = state => ({
//    accounts: getAllAccounts(state.accounts),
//    dispenser: state.dispenser
//})
//
//export default connect(
//    mapStateToProps,
//    //{ verifyPrescriptionDispatcher, dispenseDispatcher, setSelectedPharmaAddress }
//)(FakeGenerator)

export default FakeGenerator;
