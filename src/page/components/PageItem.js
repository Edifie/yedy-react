import axios from "axios";
import React, { useEffect } from "react";
import Card from "../../shared/components/UIElements/Card";

import "./PageItem.css";

const PageItem = (props) => {
  const redirectToPage = () => {
    window.location = `/pages/${props.id}`;
  };

  const handleDelete = async () => {
    await axios({
      method: "DELETE",
      url: `http://localhost:8080/api/pages/${props.id}`,
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

  return (
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image ">
          {props
            ? props.images &&
              props.images
                .slice(0, 1)
                .map((image, index) => (
                  <img
                    key={image.id || index}
                    src={`data:${image.contentType};base64,${image.imageBase64}`}
                    alt={image.filename}
                  />
                ))
            : "Loading.."}
        </div>

        <div className="place-item__info">
          <h2>{props.name}</h2>
          <h4>{props.tema}</h4>
          <h4>{props.type}</h4>
          <h4>{props.area}</h4>
        </div>

        <div className="place-item__actions">
          <button className="place-item__button" onClick={redirectToPage}>
            VIEW
          </button>
        </div>
        <button onClick={handleDelete} className="place-item__delete">
          Delete
        </button>
      </Card>
    </li>
  );
};

export default PageItem;
