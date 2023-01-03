import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import FormItem from "./FormItem";
import FormItemDetail from "./FormItemDetail";

import "./FormList.css";

const FormList = (props) => {
  const { tema } = props;
  const pageId = useParams().pageId;

  if (props.items.length === 0) {
    return (
      <>
        {tema && (
          <div className={`form-list-no-${tema}`}>
            <Card>
              <h2>No advertisement found. Maybe create one?</h2>
            </Card>
          </div>
        )}
      </>
    );
  }

  //Map every item into a jsx element so can be rendered as jsx here
  return (
    <ul className={`form-list-${tema}`}>
      {props.items.map((template) => (
        <>
          {tema && (
            <FormItem
              tema={tema}
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

          {tema && template.show && (
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
              tema={tema}
            />
          )}
        </>
      ))}
    </ul>
  );
};

export default FormList;
