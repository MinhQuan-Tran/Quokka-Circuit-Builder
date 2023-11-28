import { DeviceConnectionState } from "../reducers/deviceConnectionReducer";

export const INIT_DEVICE_CONN_STAT_ACTION = "INIT_DEVICE_CONNECTION_STATUS";
export const UPDATE_DEVICE_CONN_STAT_ACTION = "UPDATE_DEVICE_CONNECTION_STATUS";

export const updateDeviceConnectionStatus = (connection : DeviceConnectionState) => async (dispatch : any) =>
{
    try {
        dispatch ({ type: UPDATE_DEVICE_CONN_STAT_ACTION, payload: connection});
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const  UPDATE_DEVICE_NAME_ACTION = "UPDATE_DEVICE_NAME";

export const updateDeviceName = (deviceName : string) => async(dispatch : any) => {
    try {
        dispatch({type: UPDATE_DEVICE_NAME_ACTION, payload: {deviceName: deviceName}});
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}


