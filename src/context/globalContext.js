import React, { createContext, useReducer } from "react";
import { reducer } from "./globalReducer";
const GlobalContext = createContext();
export {GlobalContext};

const GlobalProvider = ({ props }) => {

    let localGlobalContext = localStorage.getItem("globalContext");
    if (!localGlobalContext) {
        localGlobalContext = {
            activeMenu: "profilPage",
            userData: {}
        }
    }else{
        localGlobalContext = JSON.parse(localGlobalContext)
    }

    const [contextData, dispatch] = useReducer(reducer, localGlobalContext);

    localStorage.setItem("globalContext", JSON.stringify(contextData));

    return (
        <GlobalContext.Provider value={{ contextData, dispatch }}>
            {props.children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
