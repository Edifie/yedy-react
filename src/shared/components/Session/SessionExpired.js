import React from "react";
import { Link } from "react-router-dom";

const SessionExpired = () => {
  return (
    <>
      <div>Upps! Session expired.</div>
      <p>Please log in</p>
      <Link to="/login"/>
    </>
  );
};

export default SessionExpired;
