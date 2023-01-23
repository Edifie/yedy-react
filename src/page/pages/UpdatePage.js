import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Templates from "../../template/pages/Templates";

import "./PageForm.css";

const UpdatePage = () => {
  const [updatedPage, setUpdatedPage] = useState();

  const pageId = useParams().pageId;

  const getPageById = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/pages/${pageId}`,
      header: "Content Type: application/json",
    })
      .then((res) => {
        setUpdatedPage(res.data.page);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPageById();
  });

  //find the page with the ID that we have in the URL from that array of pages.

  if (!updatedPage) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find page!</h2>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Templates />
    </div>
  );
};

export default UpdatePage;
