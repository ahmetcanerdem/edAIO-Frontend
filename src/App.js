import "./App.css";
import NewPage from "./components/NewPage";
import MainHeader from "./pages/MainHeader";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <MainHeader
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText={"Log in with Google"}
        onFailure={null}
        cookiePolicy={"single_host_origin"}
      />
      <main>
      </main>
    </div>
  );
}

export default App;
