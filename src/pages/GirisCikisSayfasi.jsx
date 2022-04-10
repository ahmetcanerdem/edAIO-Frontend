import React, { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import axios from "axios";

const GirisCikisSayfasi = () => {
  
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  useEffect(() => {
    console.log("girisCikisSayfasi");
    axios
      .get("http://localhost:5000/getuser", { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (!!res.data.user) {
          localStorage.setItem("loginData", JSON.stringify(res.data));
          setLoginData(res.data);
        }
      });
      console.log(localStorage.getItem("loginData"));
  }, []);

  const handleLogout = () => {
    axios.get("http://localhost:5000/logout", {
            withCredentials: true
        }).then((res) => {
            if (res.data === "done") {
                localStorage.removeItem("loginData");
                window.location.reload();
                setLoginData(null);
            }
        })
  };

  var url = window.location.pathname;

  return (
    <header className="App-header">
      <div>
        {loginData && !!loginData.user ? (
          <>
            {url === "/login" ? (
              <>
                <div>
                  <h2 style={{ color: "red", textAlign: "center" }}>
                    {loginData.user.name}
                  </h2>
                  <div style={{ color: "darkblue" }}>{loginData.user.email}</div>
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
          <LoginPage/>
        )}
      </div>
    </header>
  );
};

export default GirisCikisSayfasi;
