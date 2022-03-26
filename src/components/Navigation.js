import React from "react";
import menuItems from "./NavigationData";
import Sidebar from "./Sidebar";
import "../styles/Navigation.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Navigation() {

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-navigation">
          <div>
            <Sidebar sidebarData={menuItems}></Sidebar>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
