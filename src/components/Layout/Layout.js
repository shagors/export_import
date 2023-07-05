import React from "react";
import Routers from "../../routers/Routers";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routers />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
