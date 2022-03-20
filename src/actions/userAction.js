import history from "../history";
import {userConstants} from "../constants";
import {alertActions} from "./";
import {userService} from "../services";

export const userActions = {
    login,
    logout
};

function login(loginData, from) {
    return dispatch => {
        dispatch(request({ loginData }));

        userService.login(loginData)
            .then(
                loginData => { 
                    dispatch(success(loginData));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(loginData) { return { type: userConstants.LOGIN_REQUEST, loginData } }
    function success(loginData) { return { type: userConstants.LOGIN_SUCCESS, loginData } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}