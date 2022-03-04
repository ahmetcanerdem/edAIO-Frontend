import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ContextAll } from "./context/ContextAll";
// import AdresIletisimBilgileriSayfasi from "./pages";
// import AraSinav from "./pages";
// import Bilgilerim from "./pages";
// import Blog from "./pages";
// import ButunlemeSinavi  from "./pages";
// import Derslerim from "./pages";
// import DersProgrami from "./pages";
// import DonemSonuSinavi from "./pages";
// import IkinciYabanciDilBilgileri from "./pages";
// import NotGoruntuleme from "./pages";
// import OdemeBilgileri from "./pages";
// import OgrenciKonseyiSecimi from './pages';
// import OrtakEgitimBilgileri from "./pages";
// import Randevu from "./pages";
// import ToplantiYonetimi from "./pages";
import Login from "./pages/Login";


function App(props){
    return (
      <Router>
        <ContextAll>
          <Switch>
            <Route path="/login" element={<Login />}>
               
            </Route>
          </Switch>
        </ContextAll>
      </Router>
    );
}


export default App;
