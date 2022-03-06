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
                <NavLink className="nav-link" to="/homePage">
                  HomePage
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/grades">
                  Grades
                <NavLink className="nav-link" to="/profilPage">
                  Bilgilerim
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/internshipInfo">
                  Internship Info
                <NavLink className="nav-link" to="/lectureSchedule">
                  Ders Programı
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/paymentInfo">
                  Payment Info
              </li>
                </NavLink>
              <li className="nav-item">
                <NavLink className="nav-link" to="/appointment">
                  Appointment
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
                  Adres ve İletişim Bilgileri
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/midterms">
                  Ara Sınavlar
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/info">
                  Bilgilerim
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">
                  Blog Sayfasi
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/makeups">
                  Bütünleme Sınavları
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
