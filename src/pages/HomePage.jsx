import React from "react";

import Login from "./Login";
import { useState } from "react";

const Home = () => {
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
      <h1>edAIO Login</h1>
      <div>
        {loginData ? (
          <div>
            <h3>You logged in as {loginData.name}</h3>
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <Login setLoginData={setLoginData} loginData={loginData} />
        )}
      </div>
    </header>
  );
};

export default Home;
