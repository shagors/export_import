import React from "react";
import Routers from "../../routers/Routers";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        <Routers />
      </div>
    </>
  );
};

export default Layout;
