import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import FormItemDetail from "./FormItemDetail";
import SideDrawerTemplate from "./SideDrawerTemplate";

import "./FormItem.css";
import Backdrop from "../../shared/components/UIElements/Backdrop";

const FormItem = (props) => {
  const pageId = useParams().pageId;
  const navigate = useNavigate();

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleTemplateClick = () => {
    navigate(`/pages/${pageId}/${props.id}`);
  };

  console.log("id of template --> ", props.id);
  const handleDelete = async () => {
    await axios({
      method: "DELETE",
      url: `http://localhost:8080/api/RE/template/${props.id}`,
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

  const handleDetails = () => {
    navigate(`/pages/details/${props.id}`);
  };

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const images =
    props.images &&
    props.images
      .slice(0, 1)
      .map((image, index) => (
        <img
          key={image.id || index}
          src={`data:${image.contentType};base64,${image.imageBase64}`}
          alt={image.filename}
        />
      ));

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}></Backdrop>}

      <SideDrawerTemplate show={drawerIsOpen} onClick={closeDrawerHandler}>
        <div className="check-if-exists">
          <FormItemDetail
            showButton={true}
            key={props._id}
            id={props._id}
            price={props.price}
            location={props.location}
            category={props.category}
            numberOfRooms={props.numberOfRooms}
            adStatus={props.adStatus}
            metreSquare={props.metreSquare}
            description={props.description}
            adTitle={props.adTitle}
            images={props.images}
          />
        </div>
      </SideDrawerTemplate>

      <li className="real-estate-item">
        <Card className="real-estate-item__content">
          <div className="real-estate-item__image">{images}</div>

          <div className="real-estate-item__info">
            <h1>{props.price} €</h1>
            <h3>
              {props.category}, {props.adStatus}, T{props.numberOfRooms},{" "}
              {props.metreSquare}m²
            </h3>
            <h4>{props.location}</h4>
          </div>
          <div className="real-estate-item__buttons-boho">
            <button onClick={handleTemplateClick}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <br />
            <hr></hr>
            <button
              id="real-estate-item__buttonDetail-boho"
              onClick={openDrawerHandler}
            >
              Details
            </button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default FormItem;
