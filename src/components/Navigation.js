import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navigation.css";
function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-navigation">
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profilPage">
                  ProfilPage
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/loadingPage">
                  LoadingPage
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/addresses">
                  Addresses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/midterms">
                  Midterms
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/info">
                  Info
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">
                  Blog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/makeups">
                  Make-Ups
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;