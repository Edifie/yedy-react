import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FormList from "../components/FormList";

import "./TemplateRealEstate.css";
import SideDrawerTemplate from "../components/SideDrawerTemplate";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import FormItemDetail from "../components/FormItemDetail";
import ProfileDetails from "../components/ProfileDetails";

const TemplateRealEstate = () => {
  const [loadedTemplates, setLoadedTemplates] = useState([]);
  const [loadedPages, setLoadedPages] = useState([]);
  const [loadedUser, setLoadedUser] = useState(null);

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const pageId = useParams().pageId;

  const tema = loadedPages.tema;

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
        localStorage.setItem("url", res.data.page.url);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Pages --> ", loadedPages);
  };

  console.log(localStorage.getItem("url"));

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

  const handleShare = async () => {
    window.open(`http://localhost:3000/DT/${localStorage.getItem("url")}`);
  };

  const handleEdit = async () => {
    navigate(`/pages/edit/${pageId}`);
  };

  return (
    <>
      <div className="container">
        <button onClick={redirectToForm}>Add house</button>
        <button onClick={handleDelete}>Delete Page</button>
        <button onClick={handleShare}>Share Page</button>
        <button onClick={handleEdit}>Edit</button>
        <div>
          {loadedUser ? (
            <ProfileDetails
              name={loadedUser.name}
              email={loadedUser.email}
              images={loadedUser.images}
              namePage={loadedPages.name}
            />
          ) : (
            "loading"
          )}
        </div>

        <div>
          <FormList items={loadedTemplates} />
        </div>
      </div>
    </>
  );
};

export default TemplateRealEstate;
