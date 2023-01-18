import React, { useEffect, useState } from "react";
import axios from "axios";

import SharedFormList from "../components/SharedFormList";
import { useParams } from "react-router-dom";
import ProfileDetails from "../../template/components/ProfileDetails";


import "./SharedRealEstate.css";

const SharedRealEstate = () => {
  const [loadedSharePages, setLoadedSharePages] = useState(null);
  const [loadedTemplates, setLoadedTemplates] = useState([]);
  const [tema, setTema] = useState(null);
  const [loadedUser, setLoadedUser] = useState(null);
  const [pageId, setPageId] = useState(null);

  const userId = localStorage.getItem("userId");

  const url = useParams().url;

  const getCustomUrl = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/api/pages/DT/${url}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setLoadedSharePages(res.data.page);
      setPageId(res.data.page.id);
      setTema(res.data.page.tema);

      return res.data.page.id;
    } catch (err) {
      console.log(err);
    }
  };

  const getTemplates = async () => {
    try {
      const pageId = await getCustomUrl();
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/api/RE/template/${pageId}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setLoadedTemplates(res.data.templates);
      console.log("Res.data.templates -->", res.data.templates);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserById = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/users/${userId}`,
      header: "Content Type: application/json",
    })
      .then((res) => {
        console.log("Respond from getUserByID", res);
        setLoadedUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("User -> ", loadedUser);
  };

  useEffect(() => {
    getTemplates();
    getUserById();
  }, []);

  return (
    <>
      <div className="container-shared">
        <div className={`container-${tema}`}>
          {loadedUser && loadedSharePages ? (
            <ProfileDetails
              name={loadedUser.name}
              email={loadedUser.email}
              images={loadedSharePages.images}
              namePage={loadedSharePages.name}
              location={loadedUser.location}
              phoneNumber={loadedUser.phoneNumber}
              profilePic={loadedUser.images}
              tema={tema}
            />
          ) : (
            "loading"
          )}
        </div>

        <div>
          {loadedTemplates ? (
            <SharedFormList items={loadedTemplates} tema={tema} />
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </>
  );
};

export default SharedRealEstate;
