import {ICircuitConfigFile} from "../../common/interfaces";
import {Payload} from "../../common/types";
import {CircuitConfigFile} from "../../common/classes";
import {
    DELETE_SAVED_CIRCUIT_CONFIG_FILE_ACTION,
    FETCH_SAVED_CIRCUIT_CONFIG_FILES_ACTION
} from "../actions/savedFilesAction";

export interface savedFilesState {
    savedCircuitConfigs : ICircuitConfigFile[];
}

const initialSavedFiles : savedFilesState = {
    savedCircuitConfigs : [] as ICircuitConfigFile[],
}

const savedFilesReducer = (state = initialSavedFiles,
                           action: Payload) => {
    switch (action.type) {
        case FETCH_SAVED_CIRCUIT_CONFIG_FILES_ACTION:
            return {
                ...state,
                savedCircuitConfigs : action.payload.savedCircuitConfigs
            }
        case DELETE_SAVED_CIRCUIT_CONFIG_FILE_ACTION:
            return {
                ...state,
                savedCircuitConfigs: state.savedCircuitConfigs.filter(
                    circuitConfig => circuitConfig.id !== action.payload.id
                )
            }
        default:
            return state;
    }
}

export default savedFilesReducer;
