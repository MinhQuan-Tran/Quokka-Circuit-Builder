import {Payload} from "../../common/types";
import {UPDATE_CURRENTLY_AUTHENTICATED_USER_ACTION, UPDATE_USER_AUTHENTICATION_ACTION} from "../actions/authAction";
import {IUser} from "../../common/interfaces";

export interface AuthState {
    authenticated : boolean;
    user?: IUser | null;
}

const initialAuthState : AuthState = {
    authenticated : false,
    user: undefined
}

const authReducer = (state = initialAuthState,
action: Payload) => {
    switch (action.type) {
        case UPDATE_USER_AUTHENTICATION_ACTION:
            return {
                ...state,
                authenticated: action.payload.authenticated,
            }
        case UPDATE_CURRENTLY_AUTHENTICATED_USER_ACTION:
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state;
    }
}

export default authReducer;
