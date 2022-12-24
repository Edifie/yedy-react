import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormList from "../components/FormList";

import "./TemplateRealEstate.css";

const TemplateRealEstate = () => {
  const [loadedTemplates, setLoadedTemplates] = useState([]);

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

  useEffect(() => {
    console.log("Inside of useEffect ->", loadedTemplates);
    getTemplates();
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

  return (
      <div>
        <div id="form-list">
          <FormList items={loadedTemplates} />
        </div>

        <button onClick={redirectToForm}>Add house</button>

        <button onClick={handleDelete}>Delete Page</button>
      </div>
  );
};

export default TemplateRealEstate;
