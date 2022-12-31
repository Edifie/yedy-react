import React from "react";

const ProfileDetails = (props) => {
  return (
    <div className="sidebar-boho">
      <div className="sidebar-boho__profile-picture">
        {props
          ? props.images &&
            props.images
              .slice(0, 1)
              .map((image, index) => (
                <img
                  key={image.id || index}
                  src={`data:${image.contentType};base64,${image.imageBase64}`}
                  alt={image.filename}
                />
              ))
          : "Loading.."}
      </div>
      <div className="sidebar-boho__name">
        <h1>{props ? props.namePage : "Loading..."}</h1>
      </div>
      <div className="sidebar-boho__username">
        <h3>{props ? props.name : "Loading..."}</h3>
        <br />
      </div>
    </div>
  );
};

export default ProfileDetails;
