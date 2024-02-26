import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const UN_AUTHENTICATED_ENTRY_PATH = "/sign-in";

const ProtectedRoute = () => {
  const location = useLocation();

  const token = localStorage.getItem("TOKEN");

  if (!token) {
    return (
      <Navigate
        to={
          location.search
            ? `${UN_AUTHENTICATED_ENTRY_PATH}${location.search}`
            : UN_AUTHENTICATED_ENTRY_PATH
        }
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
