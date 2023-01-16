import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SessionExpiredCheck = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/session-expired");
    }
  }, [navigate]);
  return null;
};

export default SessionExpiredCheck;
