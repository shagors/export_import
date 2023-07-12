import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BrandPick = ({ setBrand }) => {
  const [values, setValues] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("productBrand.json").then((res) => setValues(res.data));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setBrand(selectedBrand);
    navigate("/accounts");
  };
  // console.log(selectedBrand);
  return (
    <div className="flex justify-center items-center">
      <div>
        <h1 className="text-center text-3xl text-info font-bold my-6">
          Your Selected Product Brands - {selectedBrand}
        </h1>
        <div className="card lg:w-[600px] lg:h-[350px] p-10 bg-base-100 shadow-xl mt-5 text-center ">
          <div className="flex flex-col gap-2">
            <form onSubmit={submit}>
              {values?.map((data, index) => (
                <div className="form-control" key={index}>
                  <label className="label cursor-pointer">
                    <span className="label-text">{data.name}</span>
                    <input
                      type="radio"
                      name="brand"
                      value={data.name}
                      className="radio checkbox-info"
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    />
                  </label>
                </div>
              ))}

              <div className="flex justify-end items-center align-bottom mt-8">
                <button className="btn btn-info btn-sm" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPick;
