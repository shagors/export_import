import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/user/Login";
import Signup from "../pages/user/Signup";
import ForgotPassword from "../pages/user/ForgotPassword";
import ExportImport from "../pages/ExportImport";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import AdminRoute from "../components/PrivateRoute/AdminRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import Accounts from "../pages/orders/Accounts";
import Warehouse from "../pages/warehouse/Warehouse";
import Admin from "../pages/admin/Admin";
import Transport from "../pages/dataInput/Transport";
import Export from "../pages/Dashboard/Export";
import Import from "../pages/Dashboard/Import";
import TransportRoutes from "../pages/dataInput/TransportRoutes";
import DataInput from "../pages/dataInput/DataInput";
import TransportCountry from "../pages/dataInput/TransportCountry";
import Purchase from "../pages/purchase/Purchase";
import Transportservice from "../pages/Transportservice";
import AddCharges from "../pages/dataInput/AddCharges";
import AddChargesUpdate from "../pages/dataInput/AddChargesUpdate";
import ProductBoxes from "../pages/finance/ProductBoxes";
import Home from "../pages/Home/Home";
import Finance from "../pages/finance/Finance";
import DataInputUpdate from "../pages/dataInput/DataInputUpdate";
import AccountsUpdate from "../pages/orders/AccountsUpdate";
import FinalData from "../pages/finance/FinalData";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route element={<PrivateRoute />}>
        <Route path="/exportimport" element={<ExportImport />} />
        <Route path="/export" element={<Export />} />
        <Route path="/import" element={<Import />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/accounts/:id" element={<AccountsUpdate />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/transportroutes" element={<TransportRoutes />} />
        <Route path="/datainput" element={<DataInput />} />
        <Route path="/datainput/:id" element={<DataInputUpdate />} />
        <Route path="/transportcountry" element={<TransportCountry />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/transportservice" element={<Transportservice />} />
        <Route path="/addcharges" element={<AddCharges />} />
        <Route path="/addcharges/:id" element={<AddChargesUpdate />} />
        <Route path="/productinboxes" element={<ProductBoxes />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/finaldata" element={<FinalData />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default Routers;
