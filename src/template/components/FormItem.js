import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";

import "./FormItem.css";

const FormItem = (props) => {
  const pageId = useParams().pageId;
  const navigate = useNavigate();

  const handleTemplateClick = () => {
    navigate(`/pages/${pageId}/${props.id}`);
  };

  console.log("id of template --> ", props.id);
  const handleDelete = async () => {
    await axios({
      method: "DELETE",
      url: `http://localhost:8080/api/RE/template/${props.id}`,
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
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const images =
    props.images &&
    props.images
      .slice(0, 1)
      .map((image, index) => (
        <img
          key={image.id || index}
          src={`data:${image.contentType};base64,${image.imageBase64}`}
          alt={image.filename}
        />
      ));

  return (
    <li className="real-estate-item">
      <Card className="real-estate-item__content">
        <div className="real-estate-item__image">{images}</div>

        <div className="real-estate-item__info">
          <h1>{props.price} €</h1>
          <h3>
            {props.category}, {props.adStatus}, {props.numberOfRooms}+1,{" "}
            {props.metreSquare}m²
          </h3>
          <h4>{props.location}</h4>
        </div>
        <button onClick={handleTemplateClick}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </Card>
    </li>
  );
};

export default FormItem;
