export const SHOW_SUCCESS = 'SHOW_SUCCESS'
export const SHOW_ERROR = 'SHOW_ERROR'
export const ACK_ERROR = 'ACK_ERROR'

const messenger = (state={}, action) => {
    switch (action.type) {
        case SHOW_SUCCESS:
            return {
                type: 'success',
                message: action.status
            }

        case SHOW_ERROR:
            return {
                type: 'error',
                message: action.status
            }

        case ACK_ERROR:
            return {
                type: '',
                message: ''
            }

        default:
            return state
    }
}


export default messenger
