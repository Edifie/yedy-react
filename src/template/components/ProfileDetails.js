import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./ProfileDetails.css";

const ProfileDetails = (props) => {
  const { tema } = props;

  return (
    <div className={`sidebar-${tema}`}>
      <div className={`sidebar__content-${tema}`}>
        <div className={`profile-business-margin-${tema}`}>
          <div className={`sidebar__business-picture-${tema}`}>
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
        </div>

        <div className={`sidebar__info-${tema}`}>
          <h1>{props ? props.namePage : "Loading..."}</h1>
          <h2>
            <FontAwesomeIcon icon={faLocationDot} />
            {props ? props.location : "Loading..."}
          </h2>

          <div className={`sidebar__profile-picture-${tema}`}>
            {props
              ? props.profilePic &&
                props.profilePic
                  .slice(0, 1)
                  .map((image, index) => (
                    <img
                      key={image.id || index}
                      src={`data:${image.contentType};base64,${image.imageBase64}`}
                      alt={image.filename}
                    />
                  ))
              : "Loading.."}
            <h3>{props ? props.name : "Loading..."}</h3>
          </div>
          <h2>+ {props ? props.phoneNumber : "Loading..."}</h2>
          <br />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
