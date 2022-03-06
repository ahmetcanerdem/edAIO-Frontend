import React, { useState } from "react";
import "../styles/PageStyle.css";

const LoadingPage = () => {
  const [isButtonShow, setButtonShow] = useState(true);

  const handleNewPage = () => {
    setButtonShow(false);
  };

  const closedPage = () => {
    setButtonShow(true);
  };

  return (
    <div className="loading-page">
      {isButtonShow ? (
        <>
          <div className="add-new-page-button">Loading Page</div>
          <button onClick={handleNewPage} className="add-button">
            Add A New Page
          </button>
        </>
      ) : (
        <>
          <div className="back-page-button">This Page is Loading</div>
          <button onClick={closedPage} className="back-button">Back</button>
        </>
      )}
    </div>
  );
};

export default LoadingPage;
