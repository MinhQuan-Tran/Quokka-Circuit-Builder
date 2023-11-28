//CIRCUIT OUTPUT OPERATIONS
import {IBuildOutput, ICircuitConfigFile} from "../../common/interfaces";

export const INIT_CIRCUIT_OUTPUTS_ACTION = "INIT_CIRCUIT_OUTPUTS";
export const ADD_BUILD_OUTPUT_ACTION = "ADD_BUILD_OUTPUT";

export const addBuildOutput = (buildOutput : IBuildOutput) => async (dispatch : any) => {
    try {
        dispatch({type: ADD_BUILD_OUTPUT_ACTION, payload: buildOutput});
    } catch (e) {
        console.log("Error: ", e);
    }
}


export const FETCH_CIRCUIT_BUILD_OUTPUT_ACTION = "FETCH_CIRCUIT_BUILD_OUTPUT";

export const fetchCircuitBuildOutputs = (buildOutputs : IBuildOutput[]) => async (dispatch : any) => {
    try {
        dispatch({type: FETCH_CIRCUIT_BUILD_OUTPUT_ACTION, payload:
                {buildOutputs : buildOutputs}});
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const DELETE_CIRCUIT_BUILD_OUTPUT_ACTION = "DELETE_CIRCUIT_BUILD_OUTPUT";

export const deleteCircuitBuildOutput = (buildOutputId : string) => async (dispatch : any) => {
    try {
        dispatch({type: DELETE_CIRCUIT_BUILD_OUTPUT_ACTION, payload: {
            buildOutputId : buildOutputId
            }})
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}
