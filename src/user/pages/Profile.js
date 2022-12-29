import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import UserPages from "../../page/pages/UserPages";

import profilePic from "./profile.jpg";

import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [loadedUser, setloadedUser] = useState([]);

  const navigate = useNavigate();
  const redirectToProfile = () => {
    navigate(`/${userId}/edit-profile`);
  };

  const userId = localStorage.getItem("userId");
  const getUser = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/users/${userId}`,
      header: "Content Type: multipart/form-data",
    })
      .then((res) => {
        console.log(res);
        setloadedUser(res.data.user);
        console.log("res user -> ", res.data.user);
        console.log("user picture -> ", res.data.user.images);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const images =
    loadedUser.images &&
    loadedUser.images
      .slice(0, 1)
      .map((image, index) => (
        <img
          key={image.id || index}
          src={`data:${image.contentType};base64,${image.imageBase64}`}
          alt={image.filename}
        />
      ));
  return (
    <>
      <div className="main">
        <div className="main-profile">
          <div className="profile-picture-margin">
            <div className="profile-picture">
              {loadedUser.images && loadedUser.images.length === 0 ? (
                <div className="circle">
                  <img src={profilePic} />
                </div>
              ) : (
                <div>{images}</div>
              )}
            </div>
          </div>

          <h1>{loadedUser.name}</h1>
          <div className="profile-button">
            <button onClick={redirectToProfile}>Edit profil</button>
          </div>
        </div>

        <div className="profile-pages">
          <div>
            <div className="profile-text">My sites</div>
            <hr className="profile-hr"></hr>
            <div className="profile-button__add-page">
              <button>
                Add new page ➕
              </button>
            </div>

            <div>
              <UserPages />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
