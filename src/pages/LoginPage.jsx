import React from "react";
import GoogleLogin from "react-google-login";
import "../styles/HomePage.css";

const Login = (props) => {

  const handleSubmit = (googleData) => {
    // event.preventDefault();
    if(props.loginData){
      props.loginMethod.login(googleData);
    }
  }

  return (
    <>
      <h1>edAIO Login</h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText={"Log in with Google"}
        onSuccess={handleSubmit}
        onFailure={null}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin>
    </>
  );
};

export default Login;