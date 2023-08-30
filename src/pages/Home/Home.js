import React from "react";
import Slider from "./Slider";
import Services from "./Services";
import Support from "./Support";

const Home = () => {
  return (
    <div className="w-full h-screen">
      <Slider />
      <Services />
      <Support />
      <div className="mb-10"></div>
    </div>
  );
};

export default Home;
