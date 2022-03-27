import React, { useEffect, useState } from "react";
import LoginPage from "./LoginPage";

const GirisCikisSayfasi = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    window.location.reload()
    setLoginData(null);
  };

  var url = window.location.pathname;

  return (
    <header className="App-header">
      <div>
        {loginData ? (
          <>
            {url === '/login' ? (
              <>
                <div>
                  <h2 style={{ color: "red", textAlign: "center" }}>
                    {loginData.name}
                  </h2>
                  <div style={{ color: "darkblue" }}>{loginData.email}</div>
                </div>
                <div className="logout-button">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </>
            ) : (
              <div>{window.location.reload()}</div>
            )}
          </>
        ) : (
          <LoginPage setLoginData={setLoginData} loginData={loginData} />
          
        )}
      </div>
    </header>
  );
};

export default GirisCikisSayfasi;
