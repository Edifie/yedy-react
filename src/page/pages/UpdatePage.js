import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import BaseTemplateRealEstate from "../../template/components/BaseTemplateRealEstate";
import BaseTemplateSellClothes from "../../template/components/BaseTemplateSellClothes";
import BaseTemplateHardwareStore from "../../template/components/BaseTemplateHardwareStore";

import "./PageForm.css";
import "./Template.css";

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
        console.log(res);
        setUpdatedPage(res.data.page);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPageById();
  }, []);

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

  const tema = updatedPage.tema;
  console.log(tema);

  const area = updatedPage.area;
  console.log(area);

  return (
    <div
      className={
        tema === "Boho" ? "boho" : tema === "Minimalist" ? "minimal" : "basic"
      }
    >
      <div>
        {area === "Real Estate" ? (
          <BaseTemplateRealEstate />
        ) : area === "Sell Clothes" ? (
          <BaseTemplateSellClothes />
        ) : (
          <BaseTemplateHardwareStore />
        )}
      </div>
    </div>
  );
};

export default UpdatePage;
