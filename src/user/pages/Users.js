import React, { useEffect, useState } from "react";

import axios from "axios";
import UsersList from "../components/UsersList";

const Users = () => {
  const [loadedUsers, setloadedUsers] = useState([]);

  const userId = localStorage.getItem("userId");

  const getUsers = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/users/${userId}`,
      header: "Content Type: application/json",
    })
      .then((res) => {
        console.log(res);
        setloadedUsers(res.data.user);
        console.log("res user -> ", res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return <UsersList items={loadedUsers} />;
};

export default Users;
