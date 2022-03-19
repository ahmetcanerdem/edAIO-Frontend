import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { authentication } from "./reducers/userReducer";
const loggerMiddleware = createLogger();

const userInfoFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

//remember the above should be null
const initialState = {
  userLogin: { user: userInfoFromStorage },
}

const reducer = combineReducers({
    userLogin: authentication
});

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default store;