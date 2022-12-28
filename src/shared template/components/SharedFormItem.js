import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";

import "./SharedFormItem.css";

const SharedFormItem = (props) => {
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
      </Card>
    </li>
  );
};

export default SharedFormItem;
