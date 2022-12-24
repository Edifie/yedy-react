import React from "react";
import { Link, useParams } from "react-router-dom";


import Card from "../../shared/components/UIElements/Card";
import FormItem from "./FormItem";

import "./FormList.css";

const FormList = (props) => {
  const pageId = useParams().pageId;

  if (props.items.length === 0) {
    return (
      <div className="place-list center">
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
    <div>
    <ul className="place-list">
      {props.items.map((template) => (
        <FormItem
          key={template.id}
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
    </div>
  );
};

export default FormList;
