import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    const token = localStorage.getItem('token');

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (token != "" && token != null) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;