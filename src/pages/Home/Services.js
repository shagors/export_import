import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="mt-7">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-purple-600">Working Flow</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-3 px-2 my-8 text-center">
        <Link
          to="/exportimport"
          className="border py-12 rounded-xl shadow-xl hover:shadow-2xl hover:bg-indigo-50">
          <p className="text-indigo-600 font-bold text-lg hover:text-indigo-400">
            Accounts
          </p>
        </Link>
        <Link
          to="/warehouse"
          className="border py-12 rounded-xl shadow-xl hover:shadow-2xl hover:bg-indigo-50">
          <p className="text-indigo-600 font-bold text-lg hover:text-indigo-400">
            Warehouse
          </p>
        </Link>
        <Link
          to="/admin"
          className="border py-12 rounded-xl shadow-xl hover:shadow-2xl hover:bg-indigo-50">
          <p className="text-indigo-600 font-bold text-lg hover:text-indigo-400">
            Admin
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Services;
