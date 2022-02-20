import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components";
import { HomePage, ProfilPage, LoadingPage } from "./pages";

ReactDOM.render(
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
  </Router>,

  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
