import { userConstants } from '../constants';

let user = localStorage.getItem('loginData');
const state = !user ? JSON.parse(user) : null
const initialState = state ? { loggedIn: true, state } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                loginData: action
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                loginData: action
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}