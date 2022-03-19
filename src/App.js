import React, { Component } from "react";
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
import InfoPage from "./pages/InfoPage";
import MidtermsPage from "./pages/MidtermsPage";
import MakeUpsPage from "./pages/MakeUpsPage";
import BlogPage from "./pages/BlogPage";
import GirisCikisSayfasi from "./pages/GirisCikisSayfasi";


import {
  Appointment,
  PaymentInfo,
  InternshipInfo,
  Grades,
} from "./pages";


class App extends Component {



  render() {
    return (
      <Router>
        <div className="application-etuao">
          <Navigation />
          <div className="application-menu-container">
            <Routes>
              <Route path="/" element={<GirisCikisSayfasi />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/payment" element={<PaymentInfo />} />
              <Route path="/internships" element={<InternshipInfo />} />
              <Route path="/grades" element={<Grades />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/addresses" element={<AddressPage />} />
              <Route path="/midterms" element={<MidtermsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/info" element={<InfoPage />} />
              <Route path="/makeups" element={<MakeUpsPage />} />
              <Route path="/curriculum" element={<LectureSchedule />} />
              <Route path="/courses" element={<Derslerim />} />
              <Route path="/finals" element={<DonemSonuSinavi />} />
              <Route path="/sfl" element={<IkinciYabanciDilBilgileri />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
