import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TransportCountry = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    countryName: "",
    countryPort: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // http://localhost:5001/transport_country
  // http://43.154.22.219:3091/api/dev
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/transport_country",
        formData
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

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-violet-500 text-center mt-5">
        Export Country Entry Form
      </h1>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[70%]">
          <div className="mt-8">
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Export Country Name
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Country Name"
                type="text"
                name="countryName"
                id="countryName"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-lg font-semibold" htmlFor="productBrand">
                Export Country Port
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Country Port"
                type="text"
                name="countryPort"
                id="countryPort"
                onChange={handleChange}
                required
              />
            </div>
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

export default TransportCountry;
