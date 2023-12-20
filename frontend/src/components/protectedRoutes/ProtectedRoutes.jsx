import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authContext } from "../context/AuthenticationProvider";

const ProtectedRoutes = () => {
  const authState = useContext(authContext);
  // console.log(authState.auth);

  return <>{authState.auth ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoutes;
