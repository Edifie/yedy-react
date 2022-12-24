import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import PageItem from "./PageItem";

import "./PagesList.css";

const PagesList = (props) => {
  // after submitting the form redirect to user's page
  const navigate = useNavigate();
  const navigateCreatePage = () => {
    navigate(`/pages/new`);
  };

  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No pages found. Maybe create one?</h2>
          <button onClick={navigateCreatePage}>Add Page</button>
        </Card>
      </div>
    );
  }
  //Map every item into a jsx element so can be rendered as jsx here
  return (
    <ul className="place-list">
      {props.items.map((page) => (
        <PageItem
          key={page.id}
          id={page.id}
          name={page.name}
          tema={page.tema}
          area={page.area}
          creatorId={page.creator}
          type={page.type}
          screenshot={page.screenshot}
        />
      ))}
    </ul>
  );
};

export default PagesList;
