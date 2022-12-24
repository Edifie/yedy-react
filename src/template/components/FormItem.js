import React from "react";

import "./FormItem.css";

const FormItem = (props) => {
  return (
    <div className="main">
      <li className="place-item">
        <div className="place-item__image">
          {props.images &&
            props.images.length > 0 &&
            props.images.map((image, index) => (
              <img
                key={image.id || index}
                src={`data:${image.contentType};base64,${image.imageBase64}`}
                alt={image.filename}
              />
            ))}
        </div>

        <div className="place-item__info">
          <h2>{props.category}</h2>
          <h4>{props.price}</h4>
          <h4>{props.location}</h4>
          <h4>{props.numberOfRooms}</h4>
          <h4>{props.adStatus}</h4>
          <h4>{props.metreSquare}</h4>
          <h4>{props.description}</h4>
          <h4>{props.adTitle}</h4>
        </div>
      </li>
    </div>
  );
};

export default FormItem;
