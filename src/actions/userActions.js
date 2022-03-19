
import { userConstants } from "../constants";
import { userServices } from "../services";
import { alertActions } from "./alertActions";
import { history } from "../history";

export const userActions = {
    login,
    logout
    // register,
    // delete: _delete
}

function login(googleData){
    return dispatch => {
        dispatch(request({googleData}));
        userServices.login(googleData).then(
            user => {
                dispatch(success(user));
                history.push('/');
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        )
    }
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function logout(){
    userServices.logout();
    return {type: userConstants.LOGOUT};
}
