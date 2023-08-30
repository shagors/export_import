import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUser(localStorage.getItem("values"));
  }, []);

  // console.log(user);
  const handleLogout = () => {
    localStorage.removeItem("values");
    setUser("");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-tr bg-slate-200">
      <div className="container mx-auto navbar bg-gradient-to-tr bg-slate-200 px-14 text-black font-semibold">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-200 rounded-box w-52 font-bold ">
              <li>
                <NavLink to="/exportimport">Accounts</NavLink>
              </li>
              <li>
                <NavLink to="/warehouse">Warehouse</NavLink>
              </li>
              <li>
                <NavLink to="/admin">Admin</NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/" className="btn btn-ghost normal-case text-xl">
            THT
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                className="hover:font-bold hover:text-white"
                to="/exportimport">
                Accounts
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:font-bold hover:text-white mx-2"
                to="/warehouse">
                Warehouse
              </NavLink>
            </li>
            <li>
              <NavLink className="hover:font-bold hover:text-white" to="/admin">
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <p></p>
          {user ? (
            <p style={{ cursor: "pointer" }} onClick={handleLogout}>
              Log Out
            </p>
          ) : (
            <NavLink to="/login" className="">
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
