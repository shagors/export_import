import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(localStorage.getItem("values"));
  }, []);

  const handleLogout = () => {
    // signOut(auth)
    //   .then(() => {})
    //   .catch((error) => {
    //     console.log(error);
    //   });
    localStorage.removeItem("values");
    navigate("/");
  };

  return (
    <div className="navbar bg-gradient-to-tr from-violet-500 to-pink-500 px-6 text-white">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gradient-to-tr from-violet-500 to-pink-500 rounded-box w-52 font-bold ">
            <li>
              <NavLink to="/accounts">Accounts</NavLink>
            </li>
            <li>
              <NavLink to="/warehouse">Warehouse</NavLink>
            </li>
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>
          </ul>
        </div>
        <NavLink
          to="/exportimport"
          className="btn btn-ghost normal-case text-xl">
          THT
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              className="hover:font-bold hover:text-white"
              to="/accounts">
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
        {user ? (
          <p style={{ cursor: "pointer" }} onClick={handleLogout}>
            Log Out
          </p>
        ) : (
          <NavLink to="/" className="">
            Sign In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
