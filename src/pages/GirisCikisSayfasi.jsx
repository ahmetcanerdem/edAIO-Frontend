import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions';

function GirisCikisSayfasi() {
  const user = useSelector((state) => state.authentication.loginData);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <header className="App-header">
      <div>
        {user ? (
          <>
            <div>Hello EDA-IO</div>
            <div className="logout-button">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : 
        null}
      </div>
    </header>
  );
}

export default GirisCikisSayfasi;
