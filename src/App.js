import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilPage from "./pages/ProfilPage";
import Navigation from "./components/Navigation";
import LectureSchedule from "./pages/LectureSchedule";
import Derslerim from "./pages/Derslerim";
import DonemSonuSinavi from "./pages/DonemSonuSinavi";
import { IkinciYabanciDilBilgileri } from "./pages";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="application-etuao">
          <Navigation />
          <div className="application-menu-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profilPage" element={<ProfilPage />} />
              <Route path="/lectureSchedule" element={<LectureSchedule />} />
              <Route path="/derslerim" element={<Derslerim />} />
              <Route path="/donemSonuSinavlari" element={<DonemSonuSinavi />} />
              <Route path="/ikinciYabanciDilBilgileri" element={<IkinciYabanciDilBilgileri />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
