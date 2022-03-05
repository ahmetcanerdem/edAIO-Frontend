import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/students"
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            {console.log(data)}
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

export default Home;
