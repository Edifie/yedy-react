import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import FormItem from "./FormItem";
import FormItemDetail from "./FormItemDetail";

import "./FormList.css";

const FormList = (props) => {
  const pageId = useParams().pageId;

  if (props.items.length === 0) {
    return (
      <div className="form-list center">
        <Card>
          <h2>No advertisement found. Maybe create one?</h2>
          <button>
            <Link to={`/pages/${pageId}/formRE`}>Create advertisement</Link>
          </button>
        </Card>
      </div>
    );
  }

  //Map every item into a jsx element so can be rendered as jsx here
  return (
    <ul className="form-list">
      {props.items.map((template) => (
        <>
          <FormItem
            showButton={true}
            key={template._id}
            id={template._id}
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
          {template.show && (
            <FormItemDetail
              showButton={true}
              key={template._id}
              id={template._id}
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
          )}
        </>
      ))}
    </ul>
  );
};

export default FormList;
