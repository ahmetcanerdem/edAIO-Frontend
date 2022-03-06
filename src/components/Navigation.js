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
                  Ana Sayfa
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profilPage">
                  Bilgileri
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/lectureSchedule">
                  Ders Programı
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/derslerim">
                  Derslerim
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/donemSonuSinavlari">
                  Dönem Sonu Sinavlari
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ikinciYabanciDilBilgileri">
                  İkinci Yabanci Dil Bilgileri
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