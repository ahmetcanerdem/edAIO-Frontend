import React, { useState } from "react";
import { Nav, SidebarNav, Link } from "react-router-dom";
import styled from "styled-components";
import "../styles/Navigation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IconContext } from "react-icons/lib";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

const menuItems = [
  {
    title: "Profil",
    path: "/profile",
    icon: "fa-thin fa-id-badge",
    subNav: [
      {
        title: "Bilgilerim",
        path: "/profile/info",
        icon: "fa-solid fa-circle",
      },
      {
        title: "Not Görüntüleme",
        path: "/profile/grades",
        icon: "fa-solid fa-circle",
      },
      {
        title: "Ortak Eğitim Bilgilerim",
        path: "/profile/internships",
        icon: "fa-solid fa-circle",
      },
      {
        title: "İkinci Yabancı Dil Bilgilerim",
        path: "/profile/sfl",
        icon: "fa-solid fa-circle",
      },
      {
        title: "Ödeme Bilgilerim",
        path: "/profile/payment",
        icon: "fa-solid fa-circle",
      },
      {
        title: "Adres / İletişim Bilgilerim",
        path: "/profile/addresses",
        icon: "fa-solid fa-circle",
      },
    ],
  },
  {
    name: "Dönem Bilgilerim",
    path: "/semester",
    icon: "fa-light fa-person-chalkboard",
    subNav: [
      {
        title: "Derslerim",
        path: "/semester/courses",
        icon: "fa-solid fa-circle",
      },
      {
        title: "Ders Programım",
        path: "/semester/curriculum",
        icon: "fa-solid fa-circle",
      },
    ],
  },
  {
    title: "Sınav Takvimi",
    path: "/exams",
    icon: "fa-solid fa-file-pen",
    subNav: [
      {
        title: "Ara Sınav",
        path: "/exams/midterms",
        icon: "fa-solid fa-circle",
      },
      {
        title: "Dönem Sonu Sınavı",
        path: "/exams/finals",
        icon: "fa-solid fa-circle",
      },
      {
        title: "Bütünleme Sınavı",
        path: "/exams/makeups",
        icon: "fa-solid fa-circle",
      },
    ],
  },
];

const SubMenu = ({item}) => {

  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <Link to={item.path}
      onClick = {item.subnav && showSubnav}>
        <div> 
          <i className={item.icon}></i>
          <span>{item.title}</span>
        </div>
        <div>
        {item.subNav && subnav
            ? <i className="ml-auto fas fa-caret-right fa-fw"></i>
            : null}
        </div>
      </Link>
      {
        subnav && item.subNav.map((item,index) => {
          return (
            <Link to={item.path} key={index}>
              <i className={item.icon}></i>
              <span>{item.title}</span>
            </Link>
          );
        })
      }
    </>
  );
};

function Navigation() { //Is Name Sidebar

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav>
        <Link to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1
            style={{ textAlign: "center", 
                     marginLeft: "200px", 
                     color: "green" }}
          >
            TOBB ETÜ ED-AIO Bilgi Sistemi
          </h1>
        </nav>
        <nav style={{
          background: "#15171c",
          width: "250px",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: `${({ sidebar }) => (sidebar ? "0" : "-100%")}`,
          transition: "350ms",
          zIndex: 10,
        }}>
          <div>
            <Link to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </Link>
            {menuItems.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navigation;
