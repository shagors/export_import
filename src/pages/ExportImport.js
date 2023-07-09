import React from "react";
import { Link } from "react-router-dom";

const ExportImport = () => {
  return (
    <div className="max-h-screen">
      <h1 className="text-4xl mt-10 text-center font-bold text-violet-500 uppercase tracking-wide">
        Which Mode you want go?
      </h1>
      <div className="flex justify-around items-center gap-6 mt-20">
        <div className="w-220 h-40 bg-gradient-to-tr from-violet-500 to-pink-500 rounded flex justify-center items-center">
          <Link to="/accounts">
            <h1 className="text-4xl p-10 text-white font-semibold">Accounts</h1>
          </Link>
        </div>
        <div className="w-220 h-40 bg-gradient-to-tr from-violet-500 to-pink-500 rounded flex justify-center items-center">
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
      </div>
    </div>
  );
};

export default ExportImport;
