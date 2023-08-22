import axios from "axios";
import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
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
  // http://43.154.22.219:3091/api/dev

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://43.154.22.219:3091/web-api-tht-1/api/dev/transport",
        formTransportData
      )
      .then((res) => {
        toast.success("Successfully Uploaded to server");
        navigate("/exportimport");
        // console.log(res);
      })
      .catch((err) =>
        toast.error("Error coming from server please try again later")
      );
  };
  // console.log(formTransportData);

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-violet-500 text-center mt-5">
        Transport-Way Entry Form
      </h1>
      <div className="mt-8">
        <Link to="/exportimport" className="">
          <BsArrowLeft className="w-56 lg:w-[380px] h-[35px] text-purple-500" />
          <div className="w-8 h-[2px] bg-green-700 ml-[95px] lg:ml-[175px] animate-pulse"></div>
        </Link>
      </div>
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
            <div className="mt-3">
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
              />
            </div>
            <div className="mt-5 flex flex-col gap-y-4">
              <button
                className="active:scale-[.9] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
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
