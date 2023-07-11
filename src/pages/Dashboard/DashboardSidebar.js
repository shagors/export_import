import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TfiAngleLeft } from "react-icons/tfi";

const DashboardSidebar = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-24"
        } duration-300 w-72 h-screen bg-info text-3xl pt-5 pl-4 font-semibold relative`}>
        <TfiAngleLeft
          className={`absolute cursor-pointer rounded-full w-8 h-8 -right-4 top-9 p-1 border-2 border-violet-900 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div>
          <h1 className={`cursor-pointer duration-500`}>THT</h1>
        </div>
        <div className="mt-5 w-full hover:bg-cyan-400 hover:py-1 duration-500 pl-2 rounded-md">
          <Link
            to="/export"
            className={`text-white text-xl origin-left font-normal duration-300`}>
            Export
          </Link>
        </div>
        <div className="mt-2 w-full hover:bg-cyan-400 hover:py-1 duration-500 pl-2 rounded-md">
          <Link
            to=""
            className={`text-white text-xl origin-left font-normal duration-300`}>
            Import
          </Link>
        </div>
      </div>
      <div className="p-5 text-xl font-semibold flex-1 h-screen">
        <h1>Export</h1>
      </div>
    </div>
  );
};

export default DashboardSidebar;
