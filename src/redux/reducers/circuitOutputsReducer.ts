import {Payload} from "../../common/types";
import {IBuildOutput} from "../../common/interfaces";
import {BuildOutput} from "../../common/classes";
import {
    ADD_BUILD_OUTPUT_ACTION, DELETE_CIRCUIT_BUILD_OUTPUT_ACTION,
    FETCH_CIRCUIT_BUILD_OUTPUT_ACTION,
    INIT_CIRCUIT_OUTPUTS_ACTION
} from "../actions/circuitOutputsAction";

export interface CircuitOutputsState {
    buildOutputs : IBuildOutput[]
}

const initialCircuitOutputsState = {
    buildOutputs : [] as IBuildOutput[]
}

function circuitOutputsReducer (state = initialCircuitOutputsState, action: Payload) {
    switch (action.type) {
        case INIT_CIRCUIT_OUTPUTS_ACTION:
            return {
                ...state,
                initialCircuitOutputsState
            }
        case ADD_BUILD_OUTPUT_ACTION:
            return {
                ...state,
                buildOutputs: [...state.buildOutputs, action.payload]
            }
        case FETCH_CIRCUIT_BUILD_OUTPUT_ACTION:
            return {
                ...state,
                buildOutputs: action.payload.buildOutputs
            }
        case DELETE_CIRCUIT_BUILD_OUTPUT_ACTION:
            return {
                ...state,
                buildOutputs: state.buildOutputs.filter((buildOutput) => buildOutput.id !== action.payload.buildOutputId)
            }
        default:
            return state;
    }
}

export default circuitOutputsReducer;
