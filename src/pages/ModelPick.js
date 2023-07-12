import React, { useEffect, useState } from "react";
import axios from "axios";

const ModelPick = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios.get("productBrand.json").then((res) => setValues(res.data));
  }, []);

  const handleSubmit = () => {};
  console.log(values);
  return (
    <div className="flex justify-center items-center">
      <div>
        <h1 className="text-center text-3xl text-info font-bold my-6">
          Your Selected Product Model
        </h1>
        <div className="card lg:w-[600px] lg:h-[350px] p-10 bg-base-100 shadow-xl mt-5 text-center ">
          {values?.map((data, index) => (
            <p key={index}>{data.name}</p>
          ))}
          <div className="flex justify-end items-center align-bottom mt-8">
            <button className="btn btn-info btn-sm">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPick;
