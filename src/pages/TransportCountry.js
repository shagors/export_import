import axios from "axios";
import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
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
  // http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/transport_country

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/transport_country",
        formData
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
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-violet-500 text-center mt-5">
        Entry Form For Export Country
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

export default TransportCountry;
