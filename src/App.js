import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoadingPage from "./pages/LoadingPage";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import {
  Appointment,
  HomePage,
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
              <Route path="/" element={<LoginPage />} />
              <Route path="/homePage" element={<HomePage />} />
              <Route path="/loadingPage" element={<LoadingPage />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/paymentInfo" element={<PaymentInfo />} />
              <Route path="/internshipInfo" element={<InternshipInfo />} />
              <Route path="/grades" element={<Grades />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
