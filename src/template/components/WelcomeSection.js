import React from "react";

const WelcomeSection = ({ welcomeTitle, welcomeDescription }) => {
  return (
    <div>
      <h1>{welcomeTitle}</h1>
      <p>{welcomeDescription}</p>
    </div>
  );
};

export default WelcomeSection;
