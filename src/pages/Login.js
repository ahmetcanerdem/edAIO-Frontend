import React, { useContext } from "react";
import { Layout, message } from "antd";

import GoogleLogin from "react-google-login";
import { GlobalContext } from "../context";

const { Content } = Layout;

const Login = (props) => {
  const { dispatch } = useContext(GlobalContext);

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

    if (res) {
      const data = await res.json();
      props.setLoginData(data);
      dispatch({ type: "CHANGE_USER_DATA", userData: props.loginData });
      localStorage.setItem("loginData", JSON.stringify(data));
    } else {
      message.error("Hatalı Giriş Yapıldi.");
    }
  };

  return (
    <Content className="login-container">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText={"Log in with Google"}
        onSuccess={handleLogin}
        onFailure={null}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin>
    </Content>
  );
};

export default Login;
