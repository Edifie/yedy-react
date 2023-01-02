import React, { useEffect, useState } from "react";
import axios from "axios";

import SharedFormList from "../components/SharedFormList";
import { useParams } from "react-router-dom";
import ProfileDetails from "../../template/components/ProfileDetails";
import html2canvas from "html2canvas";

import "./SharedRealEstate.css";

const SharedRealEstate = () => {
  const [loadedSharePages, setLoadedSharePages] = useState(null);
  const [loadedTemplates, setLoadedTemplates] = useState([]);
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

  const tema = loadedSharePages && loadedSharePages.tema;
  console.log(tema);

  return (
    <>
      <div className="container-shared">
        <div>
          {loadedUser && loadedSharePages ? (
            <ProfileDetails
              name={loadedUser.name}
              email={loadedUser.email}
              images={loadedSharePages.images}
              namePage={loadedSharePages.name}
              location={loadedUser.location}
              phoneNumber = {loadedUser.phoneNumber}
            />
          ) : (
            "loading"
          )}
        </div>

        <div id="form-list">
          {loadedTemplates ? (
            <SharedFormList items={loadedTemplates} />
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </>
  );
};

export default SharedRealEstate;
