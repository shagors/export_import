import React from "react";

import test from "../../assets/support.jpg";

const Support = () => {
  return (
    <div className="w-full mt-14 mb-11">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-purple-600">
          Our Productivity
        </h1>
        <div className="flex max-w-xl lg:max-w-7xl mx-auto gap-8 mt-12 group">
          <div className="bg-white/5 shadow-xl group-hover:blur-sm hover:!blur-none hover:translate-[1.2] p-8 rounded-xl hover:bg-lime-200">
            <img src={test} alt="Test" className="h-72 mx-auto rounded-lg" />
            <h1 className="uppercase text-xl font-bold mt-2">Product Name</h1>
            <h1 className="uppercase text-md font-bold mt-2">Product Model</h1>
            <p className="text-sm leading-7 my-3 font-light opacity-80">
              Some Details about this products.Some Details about this
              products.Some Details about this products
            </p>
          </div>
          <div className="bg-white/5 shadow-xl group-hover:blur-sm hover:!blur-none hover:translate-[1.2] p-8 rounded-xl hover:bg-lime-200">
            <img src={test} alt="Test" className="h-72 mx-auto rounded-lg" />
            <h1 className="uppercase text-xl font-bold mt-2">Product Name</h1>
            <h1 className="uppercase text-md font-bold mt-2">Product Model</h1>
            <p className="text-sm leading-7 my-3 font-light opacity-80">
              Some Details about this products.Some Details about this
              products.Some Details about this products
            </p>
          </div>
          <div className="bg-white/5 shadow-xl group-hover:blur-sm hover:!blur-none hover:translate-[1.2] p-8 rounded-xl hover:bg-lime-200">
            <img src={test} alt="Test" className="h-72 mx-auto rounded-lg" />
            <h1 className="uppercase text-xl font-bold mt-2">Product Name</h1>
            <h1 className="uppercase text-md font-bold mt-2">Product Model</h1>
            <p className="text-sm leading-7 my-3 font-light opacity-80">
              Some Details about this products.Some Details about this
              products.Some Details about this products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
