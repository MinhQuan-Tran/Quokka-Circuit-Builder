import {IUser} from "../../common/interfaces";

export const UPDATE_USER_AUTHENTICATION_ACTION = "UPDATE_USER_AUTHENTICATION";
export const UPDATE_CURRENTLY_AUTHENTICATED_USER_ACTION = "UPDATE_CURRENTLY_AUTHENTICATED_USER";

export const updateUserAuthentication = (authenticated : boolean) => async (dispatch : any) =>
{
    try {
        dispatch({ type: UPDATE_USER_AUTHENTICATION_ACTION, payload: {authenticated : authenticated}})
    }
    catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const updateCurrentlyAuthenticatedUser = (user : IUser | null) => async (dispatch: any) => {
    try {
        dispatch({type: UPDATE_CURRENTLY_AUTHENTICATED_USER_ACTION, payload: {user: user}});
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}
