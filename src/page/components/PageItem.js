import React from "react";
import Card from "../../shared/components/UIElements/Card";

import "./PageItem.css";

const PageItem = (props) => {
  const redirectToPage = () => {
    window.location = `/pages/${props.id}`;
  };
  return (
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={props.image} alt={props.name} />
        </div>

        <div className="place-item__info">
          <h2>{props.name}</h2>
          <h4>{props.tema}</h4>
          <h4>{props.type}</h4>
          <h4>{props.area}</h4>
        </div>

        <div className="place-item__actions">
          <button onClick={redirectToPage}>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  );
};

export default PageItem;
