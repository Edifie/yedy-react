import React from "react";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import Card from "../../shared/components/UIElements/Card";
import "./FormItemDetail.css";

const FormItemDetail = (props) => {
  const { tema } = props;
  return (
    <>
      <div className={`form-item-detail__content-${tema}`}>
        <div className={`form-item-detail__image-${tema}`}>
          <Slide>
            {props.images &&
              props.images.length > 0 &&
              props.images.map((image, index) => (
                <img
                  key={image.id || index}
                  src={`data:${image.contentType};base64,${image.imageBase64}`}
                  alt={image.filename}
                />
              ))}
          </Slide>
        </div>

        <Card className={`form-item-detail__card-${tema}`}>
          <div>
            <h1>{props.adTitle}</h1>

            <table className={`form-item-detail__table-${tema}`}>
              <tr>
                <th>Category</th>
                <td clas>{props.category}</td>
              </tr>

              <tr>
                <th>Status</th>
                <td clas>{props.adStatus}</td>
              </tr>

              <tr>
                <th>Price</th>
                <td clas>{props.price} €</td>
              </tr>

              <tr>
                <th>Address</th>
                <td clas>{props.location} </td>
              </tr>

              <tr>
                <th>Number of rooms</th>
                <td clas>{props.numberOfRooms}</td>
              </tr>

              <tr>
                <th>M²</th>
                <td clas>{props.metreSquare}m²</td>
              </tr>
            </table>

            <div className={`form-item-detail__paragh-${tema}`}>
              <h3>Description</h3>
              <p>{props.description}</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default FormItemDetail;
