import React from "react";
import { Link } from "react-router-dom";

const ExportImport = () => {
  return (
    <div className="max-h-screen flex justify-evenly items-center gap-6 mt-56">
      <div className="w-220 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded flex justify-center items-center">
        <Link to="/export">
          <h1 className="text-4xl p-10 text-white font-semibold">
            Export Product Data
          </h1>
        </Link>
      </div>
      <div className="w-220 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded flex justify-center items-center">
        <Link to="/import">
          <h1 className="text-4xl p-10 text-white font-semibold">
            Import Product Data
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default ExportImport;
