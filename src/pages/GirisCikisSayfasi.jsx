
import React, { useState } from "react";
import LoginPage from "./LoginPage";
const GirisCikisSayfasi = () => {

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

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
          <LoginPage setLoginData={setLoginData} loginData={loginData} />
        )}
      </div>
    </header>
  );
};

export default GirisCikisSayfasi;