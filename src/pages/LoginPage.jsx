import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from 'react-redux';
import { userActions } from "../actions/userAction";
import { useLocation } from 'react-router-dom';

import "../styles/HomePage.css";


function LoginPage() {
  const [inputs, setInputs] = useState({
    loginData: null
  })

  const {loginData} = inputs;
  const [submitted, setSubmitted] = useState(false);
  // const loggingIn = useSelector( state => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleLogin(googleData){
    setSubmitted(true);
    setInputs(inputs => ({...inputs, [loginData]: googleData}));
    const { from } = location.state || { from: { pathname: "/" } };
    dispatch(userActions.login(googleData, from));
  }

  return (
    submitted && 
    <>
    <h1>edAIO Login</h1>
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText={"Log in with Google"}
      onSuccess={handleLogin}
      onFailure={null}
      cookiePolicy={"single_host_origin"}
    ></GoogleLogin>
  </>);
}

export default LoginPage;