import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DataInput = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    productBrand: "",
    productModel: "",
    productWeight: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // http://localhost:5001/products
  // http://43.154.22.219:3091/api/dev

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    axios
      .post(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/products",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Successfully Uploaded to server", {
          position: "top-center",
        });
        navigate("/exportimport");
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
        Data Entry Form
      </h1>

      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[70%]">
          <div className="mt-8">
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Product Name
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Product Name"
                type="text"
                name="productName"
                id="productName"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-3">
              <label className="text-lg font-semibold" htmlFor="productBrand">
                Product Brand
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Product Brand"
                type="text"
                name="productBrand"
                id="productBrand"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-3">
              <label className="text-lg font-semibold" htmlFor="productModel">
                Product Model
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Product Model"
                type="text"
                name="productModel"
                id="productModel"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-3">
              <label className="text-lg font-semibold" htmlFor="productModel">
                Product Weight/KG
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Product Weight/KG"
                type="text"
                name="productWeight"
                id="productWeight"
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

export default DataInput;
