import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ExportImport from "../pages/ExportImport";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route element={<PrivateRoute />}>
        <Route path="/exportimport" element={<ExportImport />} />
      </Route>
    </Routes>
  );
};

export default Routers;
