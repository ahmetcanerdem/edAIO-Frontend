import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SubMenu.css";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faIdBadge,
  faPeopleGroup,
  faFilePen,
  faChalkboardUser,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";
fontawesome.library.add(
  faCircle,
  faIdBadge,
  faPeopleGroup,
  faFilePen,
  faChalkboardUser,
  faHouseUser
);

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [lastPath, setLastPath] = useState("");
  const showSubnav = () => setSubnav(!subnav);
  const handleChange = () => {
    setLastPath(item.path);
  };
  return (
    <>
      <Link
        className="sidebarLink"
        to={lastPath}
        onClick={item.subNav && showSubnav}
      >
        <div>
          <FontAwesomeIcon icon={item.icon} />
          <span className="sidebarLevel">{item.title}</span>
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link
              className="dropdownLink"
              to={item.path}
              key={index}
              onSelect={handleChange}
            >
              {console.log(lastPath)}
              <FontAwesomeIcon icon={item.icon} style={{ width: "10px" }} />
              <span className="sidebarLevel">{item.title}</span>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
