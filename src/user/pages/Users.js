import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  //dummy data because we don't have backend to fecth data yet!
  // Every user needs to have an ID, Image, Name and Forms (UserList.js)

  const USERS = [
    {
      id: "u1",
      name: "dilan taskin",
      image:
        "https://pbs.twimg.com/profile_images/1585926348153004033/72DM34bT_400x400.jpg",
      pages: 1,
    },
  ];

  /* It requires a item prop that should be an array, because we expect from UserList.js */
  return <UsersList items={USERS} />;
};

export default Users;
