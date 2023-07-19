import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Accounts = ({ brand, model }) => {
  const [serverData, setServerData] = useState([]);

  const [formData, setFormData] = useState([
    {
      productModel: "",
      productName: "",
      date: "",
      productBrand: "",
      productQuantity: "",
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/products")
      .then((res) => setServerData(res.data))
      .catch((error) => setServerData(error));
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/office_accounts", formData)
      .then((res) => {
        toast.success("Successfully File added to server");
        navigate("/purchase");
        console.log(res);
      })
      .catch((err) => toast.error(err.sqlMessage));
  };
  return (
    <>
      <div>
        <div className="">
          <h1 className="flex justify-center items-center text-4xl my-4 uppercase text-info font-bold">
            Add Accounts Data :
          </h1>
          <div className="mt-5 lg:flex justify-center items-center">
            <form
              className="card lg:w-[700px] bg-base-100 shadow-xl mt-5"
              onSubmit={formSubmit}>
              {/* <div className="form-control mt-5">
                <div className="input-group  flex lg:flex-none justify-center items-center">
                  <select
                    className="select select-info w-full max-w-xs"
                    id="selectOption"
                    value={formData.typeOfProduct}
                    name="typeOfProduct"
                    onChange={handleChange}>
                    <option defaultValue="Export" value="export">
                      Export
                    </option>
                    <option value="import">Import</option>
                  </select>
                </div>
              </div> */}
              <div className="lg:flex justify-between items-center">
                <div className="form-control card-body">
                  <label className="text-center mb-3">
                    <span className="lebel-text text-lg font-semibold">
                      Product Name
                    </span>
                  </label>
                  <div className="input-group  flex lg:flex-none justify-center items-center">
                    <select
                      className="select select-info w-full max-w-xs"
                      id="selectOption"
                      value={formData.productName}
                      name="productName"
                      onChange={handleChange}>
                      <option selected>---- Pick product Name ----</option>
                      {serverData?.map((product, index) => (
                        <option key={index}>{product.productName}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* date field */}
                <div className="lg:pr-2 text-center flex justify-center items-center">
                  <p className="pr-2">Date : </p>
                  <input
                    type="date"
                    onChange={handleChange}
                    name="date"
                    value={formData.date}
                    className="border-2 select-info rounded-md text-lg p-[6px]"
                  />
                </div>
              </div>
              <div className="flex flex-col  justify-between items-center px-8 mt-4 lg:mt-0 w-full">
                <div className="join mb-4">
                  <div className="form-control">
                    <label className="text-center mb-3">
                      <span className="lebel-text text-lg font-semibold">
                        Product Brand
                      </span>
                    </label>
                    <select
                      className="select select-info w-full max-w-xs"
                      id="selectOption"
                      value={formData.productBrand}
                      name="productBrand"
                      onChange={handleChange}>
                      <option selected>---- Pick product Brand ----</option>
                      {serverData?.map((product, index) => (
                        <option key={index}>{product.productBrand}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="join mb-4">
                  <div className="form-control">
                    <label className="text-center mb-3">
                      <span className="lebel-text text-lg font-semibold">
                        Product Model
                      </span>
                    </label>
                    <select
                      className="select select-info w-full max-w-xs"
                      id="selectOption"
                      value={formData.productModel}
                      name="productModel"
                      onChange={handleChange}>
                      <option selected>---- Pick product Brand ----</option>
                      {serverData?.map((product, index) => (
                        <option key={index}>{product.productModel}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="join mb-4">
                  <div>
                    <label className="label">
                      <span className="lebel-text text-lg font-semibold">
                        Product Quantity
                      </span>
                    </label>
                    <input
                      className="input input-bordered rounded-md join-item select-info"
                      placeholder="Quantity of Product"
                      type="number"
                      name="productQuantity"
                      value={formData.productQuantity}
                      onChange={handleChange}
                    />
                    <p className="btn join-item rounded-r-full">Pcs</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center mr-7 py-5">
                <button
                  className="btn btn-info font-bold px-8 py-1 text-slate-700"
                  type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
