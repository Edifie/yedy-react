import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

import "./Template.css";
import FormList from "../components/FormList";
import ProfileDetails from "../components/ProfileDetails";

const TemplateRealEstate = () => {
  const [loadedTemplates, setLoadedTemplates] = useState([]);
  const [loadedPages, setLoadedPages] = useState([]);
  const [loadedUser, setLoadedUser] = useState(null);
  const [tema, setTema] = useState(null);

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

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
        setLoadedTemplates(res.data.templates);
      })
      .catch((err) => {
        console.log(err);
      });
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
        setTema(res.data.page.tema);
        localStorage.setItem("url", res.data.page.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserById = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/users/${userId}`,
      header: "Content Type: application/json",
    })
      .then((res) => {
        setLoadedUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTemplates();
    getPageById();
    getUserById();
  }, []);

  const redirectToForm = () => {
    window.location = `/pages/${pageId}/formRE`;
  };

  const handleShare = async () => {
    window.open(`http://localhost:3000/DT/${localStorage.getItem("url")}`);
  };

  const handleEdit = async () => {
    navigate(`/pages/edit/${pageId}`);
  };

  return (
    <>
      <div className="container">
        <div className="template__buttons">
          <hr></hr>
          <ul>
            <li>
              <button onClick={handleEdit}>Edit</button>
            </li>

            <li>
              <button title="Share" onClick={handleShare}>
                Share
              </button>
            </li>

            <li>
              <button onClick={redirectToForm}>Add new</button>
            </li>
          </ul>
          <hr></hr>
        </div>

        <div className={`container-${tema}`}>
          {loadedUser && loadedPages ? (
            <ProfileDetails
              name={loadedUser.name}
              email={loadedUser.email}
              location={loadedUser.location}
              phoneNumber={loadedUser.phoneNumber}
              profilePic={loadedUser.images}
              images={loadedPages.images}
              namePage={loadedPages.name}
              tema={loadedPages.tema}
            />
          ) : (
            "loading"
          )}
        </div>

        <div>
          <FormList tema={tema} items={loadedTemplates} />
        </div>
      </div>
    </>
  );
};

export default TemplateRealEstate;
