import React from "react";
import { useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import FormItem from "./FormItem";
import FormItemDetail from "./FormItemDetail";

import "./FormList.css";

const FormList = (props) => {
  const { tema, area } = props;

  if (props.items.length === 0) {
    return (
      <>
        {tema && (
          <div className={`form-list-no-${tema}`}>
            <Card>
              <h2>No advertisement found. Maybe create one?</h2>
            </Card>
          </div>
        )}
      </>
    );
  }

  //Map every item into a jsx element so can be rendered as jsx here
  switch (area) {
    case "Real Estate":
      return (
        <ul className={`form-list-${tema}`}>
          {props.items.map((template) => (
            <>
              {tema && (
                <FormItem
                  tema={tema}
                  showButton={true}
                  key={template._id}
                  id={template._id}
                  price={template.price}
                  location={template.location}
                  category={template.category}
                  numberOfRooms={template.numberOfRooms}
                  adStatus={template.adStatus}
                  metreSquare={template.metreSquare}
                  description={template.description}
                  adTitle={template.adTitle}
                  images={template.images}
                  area={area}
                />
              )}

              {tema && template.show && (
                <FormItemDetail
                  showButton={true}
                  key={template._id}
                  id={template._id}
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
                  area={area}
                />
              )}
            </>
          ))}
        </ul>
      );

    case "Sell Clothes":
      return (
        <ul className={`form-list-${tema}`}>
          {props.items.map((template) => (
            <>
              {tema && (
                <FormItem
                  tema={tema}
                  showButton={true}
                  key={template._id}
                  id={template._id}
                  price={template.price}
                  category={template.category}
                  size={template.size}
                  color={template.color}
                  details={template.details}
                  brand={template.brand}
                  adTitle={template.adTitle}
                  material={template.material}
                  images={template.images}
                  area={area}
                />
              )}

              {tema && template.show && (
                <FormItemDetail
                  showButton={true}
                  key={template._id}
                  id={template._id}
                  price={template.price}
                  category={template.category}
                  size={template.size}
                  color={template.color}
                  details={template.details}
                  material={template.material}
                  adTitle={template.adTitle}
                  brand={template.brand}
                  images={template.images}
                  tema={tema}
                  area={area}
                />
              )}
            </>
          ))}
        </ul>
      );

    case "Music Store":
      return (
        <ul className={`form-list-${tema}`}>
          {props.items.map((template) => (
            <>
              {tema && (
                <FormItem
                  tema={tema}
                  showButton={true}
                  key={template._id}
                  id={template._id}
                  price={template.price}
                  category={template.category}
                  subCategory={template.subCategory}
                  brand={template.brand}
                  adTitle={template.adTitle}
                  description={template.description}
                  images={template.images}
                  area={area}
                />
              )}

              {tema && template.show && (
                <FormItemDetail
                  showButton={true}
                  key={template._id}
                  id={template._id}
                  price={template.price}
                  category={template.category}
                  subCategory={template.subCategory}
                  brand={template.brand}
                  adTitle={template.adTitle}
                  description={template.description}
                  images={template.images}
                  tema={tema}
                  area={area}
                />
              )}
            </>
          ))}
        </ul>
      );

    case "Book Store":
      return (
        <ul className={`form-list-${tema}`}>
          {props.items.map((template) => (
            <>
              {tema && (
                <FormItem
                  tema={tema}
                  showButton={true}
                  key={template._id}
                  id={template._id}
                  price={template.price}
                  category={template.category}
                  subCategory={template.subCategory}
                  adTitle={template.adTitle}
                  description={template.description}
                  writer={template.writer}
                  language={template.language}
                  publisher={template.publisher}
                  numberOfPage={template.numberOfPage}
                  printYear={template.printYear}
                  images={template.images}
                  area={area}
                />
              )}

              {tema && template.show && (
                <FormItemDetail
                  showButton={true}
                  key={template._id}
                  id={template._id}
                  price={template.price}
                  category={template.category}
                  subCategory={template.subCategory}
                  adTitle={template.adTitle}
                  description={template.description}
                  writer={template.writer}
                  language={template.language}
                  publisher={template.publisher}
                  numberOfPage={template.numberOfPage}
                  printYear={template.printYear}
                  images={template.images}
                  tema={tema}
                  area={area}
                />
              )}
            </>
          ))}
        </ul>
      );
  }
};

export default FormList;
