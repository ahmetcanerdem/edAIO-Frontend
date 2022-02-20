import React from "react";
import GoogleLogin from "react-google-login";
import { useState } from "react";

const Home = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const handleLogin = async (googleData) => {
    const res = await fetch("/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };

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
            <img src={loginData.picture} />

            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText={"Log in with Google"}
            onSuccess={handleLogin}
            onFailure={null}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
        )}
      </div>
    </header>
  );
};

export default Home;