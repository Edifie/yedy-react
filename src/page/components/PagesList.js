import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import PageItem from "./PageItem";

import './PagesList.css'

const PagesList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No pages found. Maybe create one?</h2>
          <button>
            <Link to='/pages/new'>Add page</Link>
          </button>
        </Card>
      </div>
    );
  }
  return (
    //Map every item into a jsx element so can be rendered as jsx here
    <ul className="place-list">
      {props.items.map((page) => (
        <PageItem
          key={page.id}
          id={page.id}
          image={page.imageUrl}
          name={page.name}
          tema={page.tema}
          area={page.area}
          creatorId={page.creator}
          type={page.type}
        />
      ))}
    </ul>
  );
};

export default PagesList;
