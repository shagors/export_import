import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Accounts = ({ brand, model }) => {
  const [serverData, setServerData] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState([
    {
      productModel: "",
      productName: "",
      date: "",
      productBrand: "",
      productQuantity: 0,
    },
  ]);
  // if (formData.productName === "" || formData.date === "") {
  //   toast.error("Your data is empty Please provide Data");
  // }

  const navigate = useNavigate();

  // http://localhost:5001/products
  // http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/products

  useEffect(() => {
    axios
      .get(
        "http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/products"
      )
      .then((res) => setServerData(res.data))
      .catch((error) => setServerData(error));

    axios
      .get(
        "http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/office_accounts"
      )
      .then((res) => setAccounts(res?.data))
      .catch((error) => setAccounts(error));
  }, [accounts]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/office_accounts",
        formData
      )
      .then((res) => {
        toast.success("Successfully File added to server & check below table");
        // console.log(res);
        navigate("/exportimport");
      })
      .catch((err) =>
        toast.error("Error coming from server please try again later")
      );
  };

  return (
    <>
      <div>
        <h1 className="flex justify-center items-center text-4xl my-4 uppercase text-info font-bold">
          Add Accounts Data :
        </h1>
        <div className="mt-6">
          <Link to="/exportimport" className="">
            <BsArrowLeft className="w-40 lg:w-[380px] h-[35px] text-purple-500" />
            <div className="w-8 h-[2px] bg-green-700 ml-[65px] lg:ml-[175px] animate-pulse"></div>
          </Link>
        </div>
        <div className="mt-3 lg:flex justify-center items-center">
          <form
            className="card lg:w-[700px] bg-base-100 shadow-xl mt-3"
            onSubmit={formSubmit}>
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
                    <option value="">---- Pick product Name ----</option>
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
                  value={formData?.date}
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
                    value={formData.productBrand || ""}
                    name="productBrand"
                    onChange={handleChange}>
                    <option value="">---- Pick product Brand ----</option>
                    {serverData?.map((product, index) => (
                      <option key={index}>{product?.productBrand}</option>
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
                    value={formData.productModel || ""}
                    name="productModel"
                    onChange={handleChange}>
                    <option value="">---- Pick product Brand ----</option>
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
                    value={formData.productQuantity || ""}
                    onChange={handleChange}
                  />
                  <p className="btn join-item rounded-r-full">Pcs</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center mr-7 py-5">
              <button
                className="btn btn-info font-bold px-8 py-1 text-purple-950 hover:text-purple-800"
                type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Table data get from accouts input database */}
      <div className="mb-6">
        <h1 className="text-center my-6 text-3xl text-info font-bold bg-slate-500 p-3 rounded-lg uppercase">
          Data Table
        </h1>
        <div className="overflow-x-auto add__scrollbar">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Product Brand</th>
                <th>Product Model</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {accounts?.map((product) => (
                <tr className="hover cursor-pointer" key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>{product.productBrand}</td>
                  <td>{product.productModel}</td>
                  <td>{product.productQuantity}</td>
                  <td>{product.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Accounts;
