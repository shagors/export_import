import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Purchase = () => {
  const [transportPath, setTransportPath] = useState([]);
  const [transportCountry, setTransportCountry] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState([
    {
      transportWay: "",
      countryName: "",
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    //   getting transport data from server
    axios
      .get("http://localhost:5001/transport")
      .then((res) => setTransportPath(res.data))
      .catch((error) => setTransportPath(error));

    //   getting transport country data from server
    axios
      .get("http://localhost:5001/transport_country")
      .then((res) => setTransportCountry(res.data))
      .catch((error) => setTransportCountry(error));

    //   getting accounts data from office_accounts server
    axios
      .get("http://localhost:5001/office_accounts")
      .then((res) => setAccounts(res.data))
      .catch((error) => setAccounts(error));
  }, []);

  console.log(accounts);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("", formData)
      .then((res) => {
        toast.success("Successfully File added to server");
        navigate("/exportimport");
        console.log(res);
      })
      .catch((err) => toast.error(err.sqlMessage));
  };
  return (
    <>
      <div>
        <div className="">
          <h1 className="flex justify-center items-center text-4xl my-4 uppercase text-info font-bold">
            Add Shipment Data :
          </h1>
          <div className="mt-5 lg:flex justify-center items-center">
            <form
              className="card lg:w-[700px] bg-base-100 shadow-xl mt-5"
              onSubmit={formSubmit}>
              <div className="lg:flex justify-between items-center">
                <div className="form-control  card-body">
                  <label className="text-center mb-3">
                    <span className="lebel-text text-lg font-semibold">
                      Product Shipment Way
                    </span>
                  </label>
                  <div className="input-group  flex lg:flex-none justify-center items-center">
                    <select
                      className="select select-info w-full max-w-xs"
                      id="selectOption"
                      value={formData.transportWay}
                      name="productName"
                      onChange={handleChange}>
                      <option selected>---- Pick Transport Way ----</option>
                      {transportPath?.map((product, index) => (
                        <option key={index}>{product.transportWay}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-control card-body">
                  <label className="text-center mb-3">
                    <span className="lebel-text text-lg font-semibold">
                      Product Shipment Country
                    </span>
                  </label>
                  <div className="input-group  flex lg:flex-none justify-center items-center">
                    <select
                      className="select select-info w-full max-w-xs"
                      id="selectOption"
                      value={formData.countryName}
                      name="countryName"
                      onChange={handleChange}>
                      <option selected>---- Pick Shipment Country ----</option>
                      {transportCountry?.map((product, index) => (
                        <option key={index}>{product.countryName}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center mr-7 py-5">
                <Link
                  to="/accounts"
                  className="btn btn-info font-bold px-8 py-1 text-slate-700 mr-3">
                  Back
                </Link>
                <button
                  className="btn btn-info font-bold px-8 py-1 text-slate-700"
                  type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Table data get from accouts input database */}
        <div>
          <h1 className="text-center my-6 text-3xl text-info font-bold bg-slate-500 p-3 rounded-lg">
            Data Get From accounts Page
          </h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>id</th>
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
                    <th>{product.id}</th>
                    <td>{product.productName}</td>
                    <td>{product.productBrand}</td>
                    <td>{product.productModel}</td>
                    <td>{product.productQuantity}</td>
                    <tr>{product.date}</tr>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Purchase;
