import React from "react";
import { useNavigate } from "react-router-dom";


import "./GridLeft.css";

const GridLeft = () => {

    // after submitting the form redirect to user's page
    const navigate = useNavigate();
    const userPagesUrl = () => {
        navigate(`/profile/${localStorage.getItem("userId")}`);
    };

    const navigateLogin = () => {
      navigate("/login");
  };

  return (
    <div className="grid-left">
      <div className="grid-left__text">
        <h1>The freedom to create your own website</h1>
      </div>
      <div className="grid-left__paragh">
        <p>
          {" "}
          Design and build your own high-quality websites. Whether you're
          promoting your small business, opening your store - you can do it all
          with the Yedy website builder.
        </p>
      </div>
      {localStorage.getItem("userId") ? (
          <button onClick={userPagesUrl} className="grid-left__button" type="submit">
            Get Started
          </button>
      ) : (
          <button onClick={navigateLogin} className="grid-left__button" type="submit">
            Get Started
          </button>
      )}
    </div>
  );
};

export default GridLeft;
