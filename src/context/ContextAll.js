import React, { createContext, useReducer } from "react";
import { ReducerAll } from "./ReducerAll";
export const ContextAll = createContext();

const ProviderContext = ({ children }) => {

    let localGlobalContext = localStorage.getItem("globalContext");
    if (!localGlobalContext) {
        localGlobalContext = {
            activeMenu: "/",
            userData: {}
        }
    }else{
        localGlobalContext = JSON.parse(localGlobalContext)
    }

    const [contextData, dispatch] = useReducer(ReducerAll, localGlobalContext);

    localStorage.setItem("globalContext", JSON.stringify(contextData));

    return (
        <ContextAll.Provider value={{ contextData, dispatch }}>
            {children}
        </ContextAll.Provider>
    );
};

export default ProviderContext;
