import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import PagesList from "../components/PagesList";

const UserPages = () => {
  const [loadedPages, setLoadedPages] = useState([]);

  const userId = useParams().userId;

  const getPages = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/pages/DT/${localStorage.getItem("url")}`,
      header: "Content Type: multipart/form-data",
    })
      .then((res) => {
        console.log(res);
        setLoadedPages(res.data.pages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPages();
  }, [userId]);

  return <PagesList items={loadedPages} />;
};

export default UserPages;
