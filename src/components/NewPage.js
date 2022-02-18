
import React from "react";
import "./NewPage.css";
import APage from "./APage";

const NewPage = () => {
  const handleNewPage = () => {
    <APage/>
  };

  return <button onClick={handleNewPage}>Yeni Sayfaya Gec</button>;
};

export default NewPage;
