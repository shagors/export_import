import axios from "axios";
import React, { useEffect, useState } from "react";
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

  const navigate = useNavigate();

  // http://localhost:5001/products
  // https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/products

  useEffect(() => {
    axios
      .get("https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/products")
      .then((res) => setServerData(res?.data))
      .catch((error) => setServerData(error));

    axios
      .get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts"
      )
      .then((res) => setAccounts(res?.data))
      .catch((error) => setAccounts(error));
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
      .post(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts",
        formData
      )
      .then((res) => {
        toast.success("Successfully File added to server & check below table", {
          position: "top-center",
        });
        // console.log(res);
        navigate("/exportimport");
      })
      .catch((err) =>
        toast.error("Error coming from server please try again later", {
          position: "top-center",
        })
      );
  };

  return (
    <>
      <div>
        <h1 className="flex justify-center items-center text-3xl my-4 uppercase text-info font-bold">
          Accounts Added Product Form
        </h1>
        <div className="mt-3 lg:flex justify-center items-center">
          <form
            className="lg:w-[800px] bg-base-100 shadow-xl mt-3"
            onSubmit={formSubmit}>
            <div className="lg:flex justify-around items-center my-3">
              <div className="form-control mb-2 lg:mb-0">
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
              <div className="form-control lg:pr-2 text-center flex flex-col justify-center items-center">
                <label className="text-center mb-2">
                  <span className="lebel-text text-lg font-semibold">Date</span>
                </label>
                <input
                  type="date"
                  onChange={handleChange}
                  name="date"
                  value={formData?.date}
                  className="border-2 select-info rounded-md text-lg p-[6px]"
                />
              </div>
            </div>
            <div className="flex flex-col  justify-between items-center px-8 mt-3 lg:mt-0 w-full">
              <div className="join mb-3">
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
              <div className="join mb-3">
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
              <div className="join mb-3">
                <div>
                  <label className="label">
                    <span className="lebel-text text-lg font-semibold text-center">
                      Product Quantity
                    </span>
                  </label>
                  <input
                    className="input input-bordered rounded-md join-item select-info"
                    placeholder="Quantity of Product"
                    type="number"
                    name="productQuantity"
                    min="0"
                    value={formData.productQuantity || ""}
                    onChange={handleChange}
                  />
                  <p className="btn join-item rounded-r-full">Pcs</p>
                </div>
              </div>
            </div>
            <div className="mt-4 mr-7 flex justify-end">
              <Link
                to="/exportimport"
                className="btn btn-info px-10 mx-5  mb-4">
                Back
              </Link>
              <button
                className="btn btn-info px-10 active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-lg bg-violet-500 text-white font-bold hover:text-black mb-4"
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
          Product's Data Table
        </h1>
        <div className="overflow-x-auto add__scrollbar">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="sticky top-0 bg-gray-200">ID</th>
                <th className="sticky top-0 bg-gray-200">Product Name</th>
                <th className="sticky top-0 bg-gray-200">Product Brand</th>
                <th className="sticky top-0 bg-gray-200">Product Model</th>
                <th className="sticky top-0 bg-gray-200">Quantity</th>
                <th className="sticky top-0 bg-gray-200">Date</th>
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
