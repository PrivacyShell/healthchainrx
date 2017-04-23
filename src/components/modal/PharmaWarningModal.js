import React from 'react'
//import { connect } from 'react-redux'
const $ = window.$;


class PharmaWarningModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            modalMessage: 'There is a problem...',
        }
    }

    render(){
        let {message} = this.props;
        return (
                <div className="modal fade" id="warning-modal" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title text-danger">
                                    <span className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>
                                    &nbsp;Warning
                                </h4>
                            </div>
                            <div className="modal-body">
                                <p>{message}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal">OK</button>
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

    componentDidUpdate(prevProps, prevState) {
        if(this.props.visible !== prevProps.visible){
            // toggle the modal
            this.showModal(this.props.visible);
        }
    }

    componentDidMount(){
        let {visible} = this.props || false;
        $('#warning-modal').on('hidden.bs.modal', (e) => {
            if(this.props.onModalHidden){
                this.props.onModalHidden();
            }
        })
        this.showModal(visible);
    }
}


export default PharmaWarningModal;
