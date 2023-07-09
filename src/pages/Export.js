import React from "react";

const Export = () => {
  return (
    <div className="">
      <div>
        <h1 className="flex justify-center items-center text-3xl my-4 uppercase text-violet-500 font-medium ">
          Add Export Data :
        </h1>
        <form>
          <input
            type="text"
            placeholder="Company Name"
            className="input input-bordered input-md w-full max-w-xs"
          />
        </form>
      </div>
    </div>
  );
};

export default Export;
