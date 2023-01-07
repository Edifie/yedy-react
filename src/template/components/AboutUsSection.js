import React from "react";

const WelcomeSection = ({ aboutUsTitle, aboutUsDescription }) => {
  return (
    <div>
      <h1>{aboutUsTitle}</h1>
      <p>{aboutUsDescription}</p>
    </div>
  );
};

export default WelcomeSection;