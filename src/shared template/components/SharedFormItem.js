import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import SideDrawerTemplate from "../../template/components/SideDrawerTemplate";

import "../../template/components/FormItem.css";
import FormItemDetail from "../../template/components/FormItemDetail";

const SharedFormItem = (props) => {
  const { tema, area } = props;
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
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

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  switch (area) {
    case "Real Estate":
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
                tema={tema}
                area={area}
              />
            </div>
          </SideDrawerTemplate>

          <li className={`real-estate-item-${tema}`}>
            <Card className={`real-estate-item__content-${tema}`}>
              <div className={`real-estate-item__image-${tema}`}>{images}</div>

              <div className={`real-estate-item__info-${tema}`}>
                <h1>{props.price} €</h1>
                <h3>
                  {props.category}, {props.adStatus}, T{props.numberOfRooms},{" "}
                  {props.metreSquare}m²
                </h3>
                <h4>{props.location}</h4>
              </div>
              <div className={`real-estate-item__buttons-${tema}`}>
                <br />
                <hr></hr>
                <button
                  id={`real-estate-item__buttonDetail-${tema}`}
                  onClick={openDrawerHandler}
                >
                  Details
                </button>
              </div>
            </Card>
          </li>
        </>
      );

    case "Sell Clothes":
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
                size={props.size}
                color={props.color}
                details={props.details}
                material={props.material}
                category={props.category}
                adTitle={props.adTitle}
                brand={props.brand}
                images={props.images}
                tema={tema}
                area={area}
              />
            </div>
          </SideDrawerTemplate>

          <li className={`real-estate-item-${tema}`}>
            <Card className={`real-estate-item__content-${tema}`}>
              <div className={`real-estate-item__image-${tema}`}>{images}</div>

              <div className={`real-estate-item__info-${tema}`}>
                <h1>{props.price} €</h1>
                <h3>{props.adTitle}</h3>
                <h4>{props.category}</h4>
              </div>
              <div className={`real-estate-item__buttons-${tema}`}>
                <br />
                <hr></hr>
                <button
                  id={`real-estate-item__buttonDetail-${tema}`}
                  onClick={openDrawerHandler}
                >
                  Details
                </button>
              </div>
            </Card>
          </li>
        </>
      );
  }
};

export default SharedFormItem;
