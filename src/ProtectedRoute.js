import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {

  const token = localStorage.getItem("token");
  if(token){
    return true;
  }else{
    return false;
  }
};

const ProtectedRoutes = (props) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
