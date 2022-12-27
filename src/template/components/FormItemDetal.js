import React from "react";
import Card from "../../shared/components/UIElements/Card";


const FormItem = (props) => {
  return (
      <li>
        <Card>
        <div >
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

        <div>
          <h2>{props.category}</h2>
          <h4>{props.price}</h4>
          <h4>{props.location}</h4>
          <h4>{props.numberOfRooms}</h4>
          <h4>{props.adStatus}</h4>
          <h4>{props.metreSquare}</h4>
          <h4>{props.description}</h4>
          <h4>{props.adTitle}</h4>
        </div>
        </Card>
      </li>
  );
};

export default FormItem;
