import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Transportservice = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    transportVehical: "",
    transportVehicalCost: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/transport_service", formData)
      .then((res) => {
        toast.success("Successfully Uploaded to server");
        navigate("/exportimport");
        console.log(res);
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-violet-500 text-center mt-5">
        Entry Form For Transport Service
      </h1>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[70%]">
          <div className="mt-8">
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Transport Vehicle
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-2 bg-transparent"
                placeholder="Enter Vehical Name"
                type="text"
                name="transportVehical"
                id="transportVehical"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-lg font-semibold" htmlFor="productBrand">
                Enter Vehical Cost
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-2 bg-transparent"
                placeholder="Cost Amount"
                type="number"
                name="transportVehicalCost"
                id="transportVehicalCost"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-5 flex flex-col gap-y-4">
              <button
                className="active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
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

export default Transportservice;
