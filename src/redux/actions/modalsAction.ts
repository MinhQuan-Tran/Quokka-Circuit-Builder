import {Modal} from "../../common/classes";

export const INIT_MODAL_ACTION = "INIT_MODAL";
export const OPEN_MODAL_ACTION = "OPEN_MODAL";
export const CLOSE_MODAL_ACTION = "CLOSE_MODAL";

export const openModal = (modal : Modal) => async (dispatch : any) => {
    try {
        dispatch ({ type: OPEN_MODAL_ACTION, payload: {modal: modal}});
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const closeModal = (id : string) => async (dispatch : any) => {
    try {
        dispatch ({ type: CLOSE_MODAL_ACTION, payload: {id : id}});

    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}
