
import React, { useState } from "react";
import LoginPage from "./LoginPage";
import { useSelector, useDispatch } from "react-redux";
import {login} from '../actions';

const GirisCikisSayfasi = () => {

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <header className="App-header">
      <div>
        {loginData ? (
          <>
            <div>Hello EDA-IO</div>
            <div className="logout-button">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <>
          <div>
              <button onClick={handleLogin}>Login</button>
            </div>
            <LoginPage setLoginData={setLoginData} loginData={loginData} />
            </>
        )}
      </div>
    </header>
  );
};

export default GirisCikisSayfasi;