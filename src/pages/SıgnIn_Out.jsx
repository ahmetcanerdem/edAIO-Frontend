import React from "react";
import { connect } from "react-redux";
import LoginPage from "./LoginPage";
import {userActions} from "../actions/userActions";


class SignInSignOutPage extends React.Component {
  constructor(props) {
    super(props);
    this.props.logout();
    this.state = {
      loginData: localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    localStorage.removeItem("loginData");
    this.props.logout();
  };

  render(){
    const {loginData} = this.state;
    const {loggingIn} = this.props;
    // const {setLoginData} = this.setState;
    return (
      <header className="App-header">
        <div>
          {loginData ? (
            <>
              <div>Hello EDA-IO</div>
              <div className="logout-button">
                <button onClick={this.handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <LoginPage
              loginData={loginData}
              loginMethod={loggingIn}
            />
          )}
        </div>
      </header>
    );
  }
};

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
};

const connectedLoginPage = connect(mapState, actionCreators)(SignInSignOutPage) ;

export {connectedLoginPage as GirisCikisSayfasi};
