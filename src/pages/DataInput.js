import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DataInput = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    productBrand: "",
    productModel: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success("Successfully Uploaded to server");
    navigate("/exportimport");
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-info">Data Entry Form</h1>
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
              />
            </div>
            <div>
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
              />
            </div>
            <div>
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

export default DataInput;
