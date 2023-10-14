import axios from "axios";
import React, { useEffect, useState, CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import { ClipLoader } from "react-spinners";

// loader css style
const override: CSSProperties = {
  display: "block",
  margin: "25px auto",
};

const Accounts = ({ brand, model }) => {
  const [serverData, setServerData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    fetchProducts();
    fetchAccounts();
  }, []);

  // Data fetch from products API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/products"
      );
      setServerData(response?.data);
    } catch (error) {
      toast.error("Error from server to get data!!");
    }
  };

  // Data fetch from office_accounts API
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts"
      );
      // data see in table descending order
      const sortedData = response?.data.sort((a, b) => b.id - a.id);
      setAccounts(sortedData);
      setLoading(false);
    } catch (error) {
      toast.error("Error from server to get data!!");
    }
  };

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
          Production Quantities
        </h1>
        <div className="mt-3 lg:flex justify-center items-center">
          <form
            className="lg:w-[800px] bg-base-100 shadow-xl mt-3"
            onSubmit={formSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-6">
              {/* product name */}
              <div className="form-control">
                <label className="text-center mb-3">
                  <span className="lebel-text text-lg font-semibold">
                    Product Name
                  </span>
                </label>
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

              {/* product Brand */}
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

              {/* product Model */}
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

              {/* product Quantity */}
              <div className="form-control">
                <label className="text-center mb-3">
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
      <div className="mb-6 w-full lg:w-3/4 mx-auto">
        <h1 className="text-center my-6 text-3xl text-info font-bold bg-slate-500 p-3 rounded-lg uppercase">
          Production Quantities Data Table
        </h1>
        <div className="overflow-x-auto add__scrollbar">
          {loading ? (
            <div className="">
              <ClipLoader
                color={"#36d7b7"}
                loading={loading}
                size={50}
                cssOverride={override}
              />
              <p className="text-center font-extralight text-xl text-green-400">
                Please wait ....
              </p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th className="sticky top-0 bg-gray-200">ID</th>
                  <th className="sticky top-0 bg-gray-200">Product Name</th>
                  <th className="sticky top-0 bg-gray-200">Product Brand</th>
                  <th className="sticky top-0 bg-gray-200">Product Model</th>
                  <th className="sticky top-0 bg-gray-200">Quantity</th>
                  <th className="sticky top-0 bg-gray-200">Date</th>
                  <th className="sticky top-0 bg-gray-200">Action</th>
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
                    <td>
                      <Link to={`/accounts/${product.id}`}>
                        <AiOutlineEdit className="w-6 h-6 text-purple-600" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Accounts;
