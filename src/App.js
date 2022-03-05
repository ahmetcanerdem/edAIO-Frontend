import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilPage from "./pages/ProfilPage";
import LoadingPage from "./pages/LoadingPage";
// import { GlobalContext } from './context';
import GlobalContext from "./context/globalContext";
// import Navigation from "./components/Navigation";

class App extends Component {
  render() {
    return (
      <Router>
        <GlobalContext>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/profilPage" component={ProfilPage} />
            <Route path="/loadingPage" component={LoadingPage} />
          </Switch>
        </GlobalContext>
      </Router>
    );
  }
}

export default App;
