import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ExportImport from "../pages/ExportImport";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import AdminRoute from "../components/PrivateRoute/AdminRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import Accounts from "../pages/Accounts";
import Warehouse from "../pages/Warehouse";
import Admin from "../pages/Admin";
import Transport from "../pages/Transport";
import Export from "../pages/Dashboard/Export";
import Import from "../pages/Dashboard/Import";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route element={<PrivateRoute />}>
        <Route path="/exportimport" element={<ExportImport />} />
        <Route path="/dashboard/export" element={<Export />} />
        <Route path="/import" element={<Import />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/transport" element={<Transport />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default Routers;
