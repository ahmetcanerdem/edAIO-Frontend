import React, { Component, useState } from "react";
import menuItems from "./NavigationData";
import adminItems from "./AdminData";
import Sidebar from "./Sidebar";
import "../styles/Navigation.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Navigation() {

  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  
  return (
    <>
      {
      !!loginData && loginData.isRegistered && (
        
        <div className="navigation">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-navigation">
              {!!dataUser && <div>
                <Sidebar sidebarData={dataUser?.isStudent ? menuItems : adminItems}></Sidebar>
              </div>}
            </div>
          </nav>
        </div> 

      )}
    </>
  );
}

export default Navigation;
