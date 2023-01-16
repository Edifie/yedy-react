import React from "react";

import "./AboutUsSection.css";

const WelcomeSection = ({ aboutUsTitle, aboutUsDescription, tema }) => {
  return (
    <>
      {tema && (
        <div className={`about-us-overall-${tema}`}>
          <div className={`about-us-header-${tema}`}>
            <h1>{aboutUsTitle}</h1>
          </div>
          <div className={`about-us-description-${tema}`}>
            <p>{aboutUsDescription}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeSection;
