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
                <NavLink className="nav-link" to="/homePage">
                  HomePage
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/grades">
                  Grades
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/internshipInfo">
                  Internship Info
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/paymentInfo">
                  Payment Info
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/appointment">
                  Appointment
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
