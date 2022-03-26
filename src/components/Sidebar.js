import React, { useState } from "react";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";

import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
fontawesome.library.add(faArrowRightToBracket);


const Sidebar = (props) => {

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav
          className="sidebarNav"
          style={{ left: `${({ sidebar }) => (sidebar ? "0" : "-100%")}` }}
        >
          <div className="sidebarWrap">
            <div style = {{ height: "calc(100% - 50px)" , overflow: "auto" }}>
              {props.sidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </div>
            <div style = {{ bottom : 0 , position : "absolute" }}>
              <Link className="sidebarLink" to={"/login"}>
                <div>
                  <FontAwesomeIcon icon={"arrow-right-to-bracket"} style={{color:"white"}}/>
                  <span className="sidebarLevel">Sisteme Giriş/Çıkış</span>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
