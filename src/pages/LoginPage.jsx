import React from "react";
import GoogleLogin from "react-google-login";
import "../styles/HomePage.css";

const Login = (props) => {

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
    props.setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
    window.location.reload()
  };

  return (
    <>
      <h1>edAIO Login</h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText={"Log in with Google"}
        onSuccess={handleLogin}
        onFailure={null}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin>
    </>
  );
};

export default Login;