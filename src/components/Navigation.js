import React, { Component, useState } from "react";
import menuItems from "./NavigationData";
import adminItems from "./AdminData";
import lectureItems from "./LecturerItems";
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
                <Sidebar sidebarData={dataUser?.isPersonnel ? adminItems : 
                dataUser?.isStudent ? menuItems : lectureItems}></Sidebar>
              </div>}
            </div>
          </nav>
        </div> 

      )}
    </>
  );
}

export default Navigation;
