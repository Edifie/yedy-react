import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Avatar from "../../shared/components/UIElements/Avatar";

import './UserItem.css'

const UserItem = (props) => {
  return (
    <div className="user-item">
      <Card className="user-item__content">
            <div className="user-item__image">
                <Avatar image={props.image} alt={props.name} />
            </div>

            <div className="user-item__info">
                <h2>{props.name}</h2>
            </div>
      </Card>
    </div>
  );
};

export default UserItem;
