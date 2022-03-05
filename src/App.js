import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilPage from "./pages/ProfilPage";
import LoadingPage from "./pages/LoadingPage";
import Navigation from "./components/Navigation";
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
              <Route path="/loadingPage" element={<LoadingPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
