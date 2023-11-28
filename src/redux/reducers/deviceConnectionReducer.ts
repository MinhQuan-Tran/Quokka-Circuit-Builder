import {Payload} from '../../common/types';
import {
    INIT_DEVICE_CONN_STAT_ACTION,
    UPDATE_DEVICE_CONN_STAT_ACTION,
    UPDATE_DEVICE_NAME_ACTION
} from '../actions/deviceConnectionAction';

export interface DeviceConnectionState {
    connected: boolean
    deviceName: string
}

const initialDeviceConnectionState = {
    connected : false,
    deviceName: 'default'
}

function deviceConnectionReducer (
    state = initialDeviceConnectionState,
    action : Payload
) {
    switch (action.type) {
        case INIT_DEVICE_CONN_STAT_ACTION:
            return {
                ...state,
                initialDeviceConnectionState
            }
        case UPDATE_DEVICE_NAME_ACTION:
            return {
                ...state,
                deviceName: action.payload.deviceName
            }
        case UPDATE_DEVICE_CONN_STAT_ACTION:
            return {
                ...state,
                connected: action.payload.connected,
                deviceName: action.payload.deviceName
            }
        default:
            return state;
    }
}

export  {deviceConnectionReducer};
