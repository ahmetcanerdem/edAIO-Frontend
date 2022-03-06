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
     
              <li>
                <NavLink className="nav-link" to="/homePage">
                  HomePage
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/grades">
                  Not Bilgilerim
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/profilPage">
                  Bilgilerim
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/internshipInfo">
                  Ortak Eğitim Bilgilerim
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/lectureSchedule">
                  Ders Programı
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/paymentInfo">
                  Ödeme Bilgilerim
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/appointment">
                  Randevüler
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/derslerim">
                  Derslerim
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/donemSonuSinavlari">
                  Dönem Sonu Sinavlari
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ikinciYabanciDilBilgileri">
                  İkinci Yabanci Dil Bilgileri
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/addresses">
                  Adres ve İletişim Bilgileri
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/midterms">
                  Ara Sınavlar
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/info">
                  Bilgilerim
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">
                  Blog Sayfasi
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/makeups">
                  Bütünleme Sınavları
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Giriş / Çıkış
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
