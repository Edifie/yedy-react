import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import SharedFormItem from "./SharedFormItem";

import "../../template/components/FormList";

const SharedFormList = (props) => {
  const { tema } = props;
  //Map every item into a jsx element so can be rendered as jsx here

  return (
    <ul className={`form-list-${tema}`}>
      {props.items &&
        props.items.map((template) => (
          <>
            {tema && (
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
                tema={tema}
              />
            )}
          </>
        ))}
    </ul>
  );
};

export default SharedFormList;
