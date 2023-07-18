import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TransportRoutes = ({ setTransportroutes }) => {
  const [formTransportData, setFormTransportData] = useState({
    transportWay: "",
    transportCost: "",
  });

  const navigate = useNavigate();

  const [localTransportData, setLocalTransportData] = useState([]);

  const handleChange = (event) => {
    setFormTransportData({
      ...formTransportData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage?.setItem(
      "formTransportData",
      JSON.stringify([...localTransportData, formTransportData])
    );
    toast.success("File added");
    console.log(formTransportData);
    navigate("/exportimport");
  };

  useEffect(() => {
    const storeData = localStorage?.getItem("formTransportData");
    if (storeData) {
      setLocalTransportData(JSON.parse(storeData));
    }
  }, []);

  return (
    <div>
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
