import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Firebase.init";

const Navbar = () => {
  const { pathName } = useLocation();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  return (
    <div className="navbar bg-violet-500 text-white">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-violet-500 rounded-box w-52 font-bold ">
            <li>
              <NavLink to="/export">Export</NavLink>
            </li>
            <li>
              <NavLink to="/import">Import</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
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
            <NavLink className="hover:font-bold hover:text-white" to="/export">
              Export
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:font-bold hover:text-white mx-2"
              to="/import">
              Import
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:font-bold hover:text-white"
              to="/dashboard">
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user?.uid ? (
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
