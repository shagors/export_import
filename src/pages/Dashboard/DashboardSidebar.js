import React from "react";
import { Link } from "react-router-dom";

const DashboardSidebar = ({ children }) => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {children}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard/export" className="text-xl font-medium">
                Export Products
              </Link>
            </li>
            <li>
              <Link className="text-xl font-medium">Import Products</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
