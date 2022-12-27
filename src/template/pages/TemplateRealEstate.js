import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormList from "../components/FormList";

import "./TemplateRealEstate.css";

const TemplateRealEstate = () => {
  const [loadedTemplates, setLoadedTemplates] = useState([]);
  const [loadedPages, setLoadedPages] = useState([]);
  const [loadedUser, setLoadedUser] = useState(null);

  const userId = localStorage.getItem("userId");

  const pageId = useParams().pageId;

  

  const getTemplates = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/RE/template/${pageId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("Respond from the request -->", res);
        setLoadedTemplates(res.data.templates);
        console.log("Res.data.templates -->", res.data.templates);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Loaded Templates --> ", loadedTemplates);
  };

  const getPageById = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/pages/${pageId}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setLoadedPages(res.data.page);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Pages --> ", loadedPages);
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
    getPageById();
    getUserById();
  }, []);

  const redirectToForm = () => {
    window.location = `/pages/${pageId}/formRE`;
  };

  const handleDelete = async () => {
    await axios({
      method: "DELETE",
      url: `http://localhost:8080/api/pages/${pageId}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("Respond from the request -->", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tema = loadedPages.tema;

  return (
    <>
      <button onClick={redirectToForm}>Add house</button>

      <button onClick={handleDelete}>Delete Page</button>
      <div id="container">
        <div
          className={
            tema === "Boho"
              ? "boho"
              : tema === "Minimalist"
              ? "minimal"
              : "basic"
          }
        >
          <div id="sidebar">
            <div id>
              {loadedPages ? loadedPages.name : "Loading..."}

              <div id="username">
                {loadedUser ? loadedUser.name : "Loading..."}
                <br />
              </div>
            </div>
          </div>
          <div id="form-list">
            <FormList items={loadedTemplates} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateRealEstate;
