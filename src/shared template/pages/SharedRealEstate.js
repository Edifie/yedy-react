import React, { useEffect, useState } from "react";
import axios from "axios";

import SharedFormList from "../components/SharedFormList";
import { useParams } from "react-router-dom";

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
      <div className="container">
        <div
          className={
            tema === "Boho"
              ? "boho"
              : tema === "Minimalist"
              ? "minimal"
              : "basic"
          }
        >
          <div className="sidebar-boho">
            <div className="profile-picture">
              <div>
                {loadedUser
                  ? loadedUser.images &&
                    loadedUser.images
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
              <br />
            </div>
            <div>{loadedSharePages ? loadedSharePages.name : "Loading..."}</div>

            <div id="username">
              {loadedUser ? loadedUser.name : "Loading..."}
              <br />
            </div>
          </div>

          <div id="form-list">
            <SharedFormList items={loadedTemplates} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedRealEstate;
