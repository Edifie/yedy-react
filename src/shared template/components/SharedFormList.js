import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import SharedFormItem from "./SharedFormItem";

import "./SharedFormList.css";

const SharedFormList = (props) => {
  //Map every item into a jsx element so can be rendered as jsx here

  if (props.items.length === 0) {
    return (
      <div className="form-list center">
        <Card>
          <h2>No templates found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="form-list">
      {props.items &&
        props.items.map((template) => (
          <SharedFormItem
            key={template._id}
            id={template.id}
            price={template.price}
            location={template.location}
            category={template.category}
            numberOfRooms={template.numberOfRooms}
            adStatus={template.adStatus}
            metreSquare={template.metreSquare}
            description={template.description}
            adTitle={template.adTitle}
            images={template.images}
          />
        ))}
    </ul>
  );
};

export default SharedFormList;
