import React, { Component, useState } from "react";
import menuItems from "./NavigationData";
import Sidebar from "./Sidebar";
import "../styles/Navigation.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Navigation() {

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );


  return (
    <div className="navigation">
      {!!loginData && (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container-navigation">
            <div>
              <Sidebar sidebarData={menuItems}></Sidebar>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navigation;
