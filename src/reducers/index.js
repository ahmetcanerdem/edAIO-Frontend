import isLoggedReducer from "./isLogged";
import {combineReducers} from "redux";

const reducers = combineReducers({
    isLogged: isLoggedReducer
});
export default reducers;