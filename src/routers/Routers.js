import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ExportImport from "../pages/ExportImport";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import AdminRoute from "../components/PrivateRoute/AdminRoute";
import Dashboard from "../pages/Dashboard/Dashboard";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route element={<PrivateRoute />}>
        <Route path="/exportimport" element={<ExportImport />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default Routers;
