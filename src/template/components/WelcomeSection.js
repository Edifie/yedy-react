import React from "react";

import "./WelcomeSection.css";

const WelcomeSection = ({ tema, welcomeTitle, welcomeDescription }) => {
  return (
    <>
      {tema && (
        <div className={`welcome-section-overall-${tema} `}>
          <div className={`welcome-section-header-${tema}`}>
            <h1>{welcomeTitle}</h1>
          </div>
          <div className={`welcome-section-description-${tema}`}>
            <p>{welcomeDescription}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeSection;
