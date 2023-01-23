import React from "react";

import SharedFormItem from "./SharedFormItem";

import "../../template/components/FormList";
import FormItemDetail from "../../template/components/FormItemDetail";

const SharedFormList = (props) => {
  const { tema, area } = props;
  //Map every item into a jsx element so can be rendered as jsx here

  switch (area) {
    case "Real Estate":
      return (
        <ul className={`form-list-${tema}`}>
          {props.items.map((template) => (
            <>
              {tema && (
                <SharedFormItem
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
                <SharedFormItem
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
  }
};

export default SharedFormList;
