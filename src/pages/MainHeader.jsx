import { NavLink } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { useState } from "react";

const MainHeader = (props) => {

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const handleLogin = async (googleData) => {
    const res = await fetch("/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <header className="App-header">
      <nav>
        <ul>
          <li>
            <NavLink to="/newPage">NewPage</NavLink>
          </li>
        </ul>
      </nav>
      <h1>edAIO Login</h1>
      <div>
        {loginData ? (
          <div>
            <h3>You logged in as {loginData.name}</h3>
            <img src={loginData.picture} />

            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <GoogleLogin
            clientId={props.clientId}
            buttonText={props.buttonText}
            onSuccess={handleLogin}
            onFailure={props.onFailure}
            cookiePolicy={props.cookiePolicy}
          ></GoogleLogin>
        )}
      </div>
    </header>
  );
};

export default MainHeader;

/*
<Route path="/newPage">
<NewPage/>
</Route>
*/
