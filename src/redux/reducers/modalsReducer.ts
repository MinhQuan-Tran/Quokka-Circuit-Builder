import {Payload} from '../../common/types';
import {
    CLOSE_MODAL_ACTION,
    INIT_MODAL_ACTION,
    OPEN_MODAL_ACTION,
} from '../actions/modalsAction';
import {IModal} from "../../common/interfaces";


export interface ModalsState {
    modals : IModal[];
}

const initialModalState = {
    modals : [] as IModal[],
}

function modalsReducer (
    state = initialModalState,
    action : Payload) {
    switch (action.type) {
        case INIT_MODAL_ACTION:
            return {
                ...state,
                initialModalState
            };
        case OPEN_MODAL_ACTION:
            return {
                ...state,
                modals : state.modals.concat(action.payload.modal)
            }
        case CLOSE_MODAL_ACTION:
            return {
                ...state,
                modals: state.modals.filter(modal => modal.id !== action.payload.id)
            }
        default:
            return state;
    }
}


export {modalsReducer}
