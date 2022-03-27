import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Navigation from "./components/Navigation";
import LectureSchedule from "./pages/LectureSchedule";
import Derslerim from "./pages/Derslerim";
import DonemSonuSinavi from "./pages/DonemSonuSinavi";
import IkinciYabanciDilBilgileri from "./pages/IkinciYabanciDilBilgileri";
import AddressPage from "./pages/AddressPage";
import MidtermsPage from "./pages/MidtermsPage";
import MakeUpsPage from "./pages/MakeUpsPage";
import BlogPage from "./pages/BlogPage";
import GirisCikisSayfasi from "./pages/GirisCikisSayfasi";
import AdminPage from "./pages/AdminPage";
import { Appointment, PaymentInfo, InternshipInfo, Grades } from "./pages";

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  return (
    <Router>
      <div className="application-etuao">
        <Navigation />
        <div className={!!loginData ? "application-menu-container": "application-menu-container-first"}>
          {!!loginData ? (
            <div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route
                  path="/otherpages/appointment"
                  element={<Appointment />}
                />
                <Route path="/profile/payment" element={<PaymentInfo />} />
                <Route
                  path="/profile/internships"
                  element={<InternshipInfo />}
                />
                <Route path="/profile/grades" element={<Grades />} />
                <Route path="/profile/addresses" element={<AddressPage />} />
                <Route path="/exams/midterms" element={<MidtermsPage />} />
                <Route path="/otherpages/blog" element={<BlogPage />} />
                <Route path="/profile/info" element={<ProfilePage />} />
                <Route path="/exams/makeups" element={<MakeUpsPage />} />
                <Route
                  path="/semester/curriculum"
                  element={<LectureSchedule />}
                />
                <Route path="/semester/courses" element={<Derslerim />} />
                <Route path="/exams/finals" element={<DonemSonuSinavi />} />
                <Route
                  path="/profile/sfl"
                  element={<IkinciYabanciDilBilgileri />}
                />
                <Route path="/login" element={<GirisCikisSayfasi />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </div>
          ) : (
            <div>
              <Routes>
                <Route path="/*" element={<GirisCikisSayfasi />} />
              </Routes>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
