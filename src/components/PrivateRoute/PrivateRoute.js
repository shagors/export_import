import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "../../Firebase/Firebase.init";

const PrivateRoute = () => {
  const location = useLocation();
  const user = auth?.currentUser;
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
