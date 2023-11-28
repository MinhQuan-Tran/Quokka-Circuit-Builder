import {ICircuitConfigFile} from "../../common/interfaces";
export const FETCH_SAVED_CIRCUIT_CONFIG_FILES_ACTION = "FETCH_SAVED_CIRCUIT_CONFIG_FILES";

export const fetchSavedCircuitConfigFiles = (savedCircuitConfigFiles : ICircuitConfigFile[]) => async (dispatch : any) => {
    try {
        dispatch({type: FETCH_SAVED_CIRCUIT_CONFIG_FILES_ACTION, payload:
                {savedCircuitConfigs : savedCircuitConfigFiles}});
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}


export const  DELETE_SAVED_CIRCUIT_CONFIG_FILE_ACTION = "DELETE_SAVED_CIRCUIT_CONFIG_FILE";

export const deleteSavedCircuitConfigFile = (id : string) => async(dispatch : any) => {
    try {
        dispatch({type: DELETE_SAVED_CIRCUIT_CONFIG_FILE_ACTION, payload: {id: id}});
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}
