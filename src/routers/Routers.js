import React, { useState } from "react";
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
import BrandPick from "../pages/BrandPick";
import ModelPick from "../pages/ModelPick";
import TransportRoutes from "../pages/TransportRoutes";
import DataInput from "../pages/DataInput";

const Routers = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route element={<PrivateRoute />}>
        <Route path="/exportimport" element={<ExportImport />} />
        <Route path="/export" element={<Export />} />
        <Route path="/import" element={<Import />} />
        <Route
          path="/accounts"
          element={<Accounts brand={brand} model={model} />}
        />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/brandpick" element={<BrandPick setBrand={setBrand} />} />
        <Route path="/modelpick" element={<ModelPick setModel={setModel} />} />
        <Route path="/transportroutes" element={<TransportRoutes />} />
        <Route path="/datainput" element={<DataInput />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default Routers;
