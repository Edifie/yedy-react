import React from "react";

import UserItem from "./UserItem";
import Card from '../../shared/components/UIElements/Card';

import './UsersList.css';

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found!</h2>
        </Card>
      </div>
    );
  }

  //else
  return (
    //Map every item into a jsx element so can be rendered as jsx here.
    <ul className="users-list">

      {props.items.map((user) => (
        /* These props are data that we expect from Users.js */
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
        />

      ))}
    </ul>
  );
};

export default UsersList;
