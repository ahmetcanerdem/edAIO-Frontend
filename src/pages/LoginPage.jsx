import React from "react";
import "../styles/HomePage.css";

const Login = () => {
  const handleLogin = () => {
    console.log("handleLoginde");
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <>
      <h1 style={{color: "red", textAlign: "center"}}>edAIO'e Giriş Yap</h1>
      <button className="sign-in-button" onClick={handleLogin}>
        <p style={{color: "darkblue"}}>Google İle Giriş Yap</p>
      </button>
    </>
  );
};

export default Login;
