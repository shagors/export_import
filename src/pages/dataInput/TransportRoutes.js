import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TransportRoutes = () => {
  const [formTransportData, setFormTransportData] = useState({
    transportWay: "",
    transportCost: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormTransportData({
      ...formTransportData,
      [event.target.name]: event.target.value,
    });
  };

  // http://localhost:5001/transport

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/transport",
        formTransportData
      )
      .then((res) => {
        toast.success("Successfully Uploaded to server", {
          position: "top-center",
        });
        navigate("/exportimport");
        // console.log(res);
      })
      .catch((err) =>
        toast.error("Error coming from server please try again later", {
          position: "top-center",
        })
      );
  };
  // console.log(formTransportData);

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-violet-500 text-center mt-5">
        Transport-Way Entry Form
      </h1>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[70%]">
          <div className="mt-8">
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Create Transport Way
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-3 bg-transparent"
                placeholder="Enter Transport way"
                type="text"
                name="transportWay"
                id="transportWay"
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="mt-3">
              <label className="text-lg font-semibold" htmlFor="productBrand">
                Transport Way Cost
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-3 bg-transparent"
                placeholder="Enter Transport Cost"
                type="number"
                name="transportCost"
                id="transportCost"
                onChange={handleChange}
                required
                min="0"
              />
            </div> */}
            <div className="mt-5 flex justify-end gap-y-4">
              <Link to="/exportimport" className="btn btn-info px-10 mx-5">
                Back
              </Link>
              <button
                className="btn btn-info px-10 active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-lg bg-violet-500 text-white font-bold hover:text-black"
                type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransportRoutes;
