import React from "react";
import { Link } from "react-router-dom";

const ExportImport = () => {
  return (
    <div className="max-h-screen mb-6">
      <h1 className="text-xl md:text-4xl mt-10 text-center font-bold text-violet-500 uppercase tracking-wide underline">
        Add Services?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-center mt-7 mx-[35px] md:mx-0">
        <Link
          to="/datainput"
          className="btn btn-info w-60 p-2 text-white font-bold text-xl mt-4">
          Product Data
        </Link>
        <Link
          to="/transportroutes"
          className="btn btn-info w-60 p-2 text-white font-bold text-xl mt-4">
          Transport Way
        </Link>
        <Link
          to="/transportcountry"
          className="btn btn-info w-60 p-1 text-white font-bold text-xl mt-4">
          Transport Country
        </Link>
        {/* <button className="btn btn-info w-60 p-1 text-white font-bold text-xl mt-4">
          <Link to="/transportservice">Transport Service</Link>
        </button> */}
        <Link
          to="/addcharges"
          className="btn btn-info w-60 p-1 text-white font-bold text-xl mt-4">
          Add Charges
        </Link>
        <Link
          to="/accounts"
          className="btn btn-info w-60 p-1 text-white font-bold text-xl mt-4">
          Accounts
        </Link>
        <Link
          to="/productinboxes"
          className="btn btn-info w-60 p-1 text-white font-bold text-xl mt-4">
          Product In Boxes
        </Link>
        <Link
          to="/purchase"
          className="btn btn-info w-60 p-1 text-white font-bold text-xl mt-4">
          Purchase
        </Link>
        <Link
          to="/finance"
          className="btn btn-info w-60 p-1 text-white font-bold text-xl mt-4">
          Finance
        </Link>
      </div>
      {/* <div className="lg:flex justify-around items-center gap-6 mt-10 lg:mt-7">
        <div className="w-220 h-40 bg-gradient-to-tr from-violet-500 to-pink-500 rounded flex justify-center items-center">
          <Link to="/accounts">
            <h1 className="text-4xl p-10 text-white font-semibold">Accounts</h1>
          </Link>
        </div>
        <div className="w-220 h-40 bg-gradient-to-tr from-violet-500 to-pink-500 rounded flex justify-center items-center my-10">
          <Link to="/warehouse">
            <h1 className="text-4xl p-10 text-white font-semibold">
              Warehouse
            </h1>
          </Link>
        </div>
        <div className="w-220 h-40 bg-gradient-to-tr from-violet-500 to-pink-500 rounded flex justify-center items-center">
          <Link to="/admin">
            <h1 className="text-4xl p-10 text-white font-semibold">Admin</h1>
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default ExportImport;
