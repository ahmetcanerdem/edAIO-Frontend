import React, { useState } from "react";
import axios from "axios";
import LoginPage from "./LoginPage";
export default function SigningUp() {

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleLogout = () => {
    console.log("logout");
    axios
      .get("http://localhost:5000/logout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Alo");
        if (res.data === "done") {
          localStorage.removeItem("loginData");
          window.location.reload();
          localStorage.clear();
          setLoginData(null);
        }
      });
  };

  return (
    !!loginData ? 
    <>
      <h2 style={{ color: "red", textAlign: "center", marginTop: "100px" }}>
        Henuz Kaydiniz Tamamlanmadi, Lutfen Daha Sonra Tekrar Deneyiniz
      </h2>

      <div className="logout-button">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </> : <LoginPage/>
  );
}
