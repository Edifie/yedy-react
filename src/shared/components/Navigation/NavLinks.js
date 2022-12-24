import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const userId = localStorage.getItem("userId");

  const logout = () => {
    // remove the token from the local storage
    localStorage.removeItem("token");
    setToken(null);
    localStorage.removeItem("userId");
    // redirect the user to the login page
    window.location.replace("/login");
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li>
        <NavLink to="/resources">Resources</NavLink>
      </li>

      {token && (
        <li>
          <NavLink to="/pages/new">Add new page</NavLink>
        </li>
      )}

      <li>
        <NavLink to={"/" + userId + "/pages"}>Profile</NavLink>
      </li>
      {!token && (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}

      {token && <li onClick={logout}>Logout</li>}
    </ul>
  );
};

export default NavLinks;
