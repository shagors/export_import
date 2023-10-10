import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const DataInput = () => {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    fetchProducts();
  }, []);

  // products fetch from server
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/products"
      );
      setProducts(response?.data);
    } catch (error) {
      toast.error("Error getting data from server!", {
        position: "top-center",
      });
    }
  };

  // http://localhost:5001/products
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
        toast.success("Successfully Data Uploaded", {
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

  // product delete from server and also frontend
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this Product Data?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/products/${id}`
        );
        toast.warn("Data successfully Deleted!!", { position: "top-center" });
        fetchProducts();
      } catch (error) {
        toast.error("You can't delete now. Please try again later!", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-violet-500 text-center mt-5">
        New Product Entry Form
      </h1>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[70%]">
          <div className="mt-8">
            <div className="mt-3">
              <label className="text-lg font-semibold" htmlFor="productName">
                Product Name
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-[10px] mt-1 bg-transparent"
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
                className="w-full border-2 border-gray-100 rounded-xl p-[10px] mt-1 bg-transparent"
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
                className="w-full border-2 border-gray-100 rounded-xl p-[10px] mt-1 bg-transparent"
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
                className="w-full border-2 border-gray-100 rounded-xl p-[10px] mt-1 bg-transparent"
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

      {/* Table data get from products database */}
      <div className="w-full lg:w-3/4 mx-auto">
        <h1 className="text-center my-6 text-2xl text-info font-bold bg-slate-500 p-[10px] rounded-lg uppercase">
          All Product's List
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
                <th className="sticky top-0 bg-gray-200">Product Weight/KG</th>
                <th className="sticky top-0 bg-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr className="hover cursor-pointer" key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>{product.productBrand}</td>
                  <td>{product.productModel}</td>
                  <td>{product.productWeight}</td>
                  <td className="flex justify-around items-center">
                    <Link to={`/datainput/${product.id}`}>
                      <AiOutlineEdit className="w-6 h-6 text-purple-600" />
                    </Link>
                    <button onClick={() => handleDelete(product.id)}>
                      <AiOutlineDelete className="w-6 h-6 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataInput;
