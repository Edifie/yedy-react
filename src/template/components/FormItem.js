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

  const { tema, area } = props;

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleTemplateClick = () => {
    if (area === "Real Estate") {
      navigate(`/pages/${pageId}/RE/${props.id}`);
    } else if (area === "Sell Clothes") {
      navigate(`/pages/${pageId}/SC/${props.id}`);
    } else if (area === "Music Store") {
      navigate(`/pages/${pageId}/MS/${props.id}`);
    } else if (area === "Book Store") {
      navigate(`/pages/${pageId}/BS/${props.id}`);
    } else if (area === "Jewellery Store") {
      navigate(`/pages/${pageId}/JS/${props.id}`);
    } else {
      console.log("Error in navigation.");
    }
  };

  const handleDelete = async () => {
    if (area === "Real Estate") {
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
    } else if (area === "Sell Clothes") {
      await axios({
        method: "DELETE",
        url: `http://localhost:8080/api/SC/template/${props.id}`,
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
    } else if (area === "Book Store") {
      await axios({
        method: "DELETE",
        url: `http://localhost:8080/api/BS/template/${props.id}`,
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
    } else if (area === "Jewellery Store") {
      await axios({
        method: "DELETE",
        url: `http://localhost:8080/api/JS/template/${props.id}`,
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
    } else if (area === "Jewellery Store") {
      await axios({
        method: "DELETE",
        url: `http://localhost:8080/api/MS/template/${props.id}`,
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
    } else {
      console.log("Error in deleting.");
    }
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
                <button onClick={handleTemplateClick}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
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
                <button onClick={handleTemplateClick}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
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

    case "Music Store":
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
                category={props.category}
                subCategory={props.subCategory}
                brand={props.brand}
                adTitle={props.adTitle}
                description={props.description}
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
                <h4>{props.subCategory}</h4>
              </div>
              <div className={`real-estate-item__buttons-${tema}`}>
                <button onClick={handleTemplateClick}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
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

    case "Book Store":
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
                category={props.category}
                subCategory={props.subCategory}
                adTitle={props.adTitle}
                description={props.description}
                writer={props.writer}
                language={props.language}
                publisher={props.publisher}
                numberOfPage={props.numberOfPage}
                printYear={props.printYear}
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
                <h4>{props.writer}</h4>
              </div>
              <div className={`real-estate-item__buttons-${tema}`}>
                <button onClick={handleTemplateClick}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
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
    case "Jewellery Store":
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
                category={props.category}
                subCategory={props.subCategory}
                adTitle={props.adTitle}
                description={props.description}
                brand={props.brand}
                metal={props.metal}
                color={props.color}
                gems={props.gems}
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
                <h4>{props.metal}</h4>
              </div>
              <div className={`real-estate-item__buttons-${tema}`}>
                <button onClick={handleTemplateClick}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
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

export default FormItem;
