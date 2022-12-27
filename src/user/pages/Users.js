import React, { useEffect, useState } from "react";

import axios from "axios";
import UsersList from "../components/UsersList";

const Users = () => {
  const [loadedUsers, setloadedUsers] = useState([]);


  const getUsers = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:8080/api/users/",
      header: "Content Type: application/json",
    })
      .then((res) => {
        console.log(res);
        setloadedUsers(res.data.users);
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
