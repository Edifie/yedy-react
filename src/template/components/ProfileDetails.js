import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./ProfileDetails.css";

const ProfileDetails = (props) => {
  const profilePic =
    props.profileImage &&
    props.profileImage
      .slice(0, 1)
      .map((image, index) => (
        <img
          key={image.id || index}
          src={`data:${image.contentType};base64,${image.imageBase64}`}
          alt={image.filename}
        />
      ));

  return (
    <div className="sidebar-boho">
      <div className="sidebar__content-boho">
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
        <div className="sidebar-boho__info">
          <h1>{props ? props.namePage : "Loading..."}</h1>
          <h2>
            <FontAwesomeIcon icon={faLocationDot} />{" "}
            {props ? props.location : "Loading..."}
          </h2>
          <br /> <br />
          <img src={profilePic}/>
          <h3>{props ? props.name : "Loading..."}</h3>
          <h2>+ {props ? props.phoneNumber : "Loading..."}</h2>
          <br />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
