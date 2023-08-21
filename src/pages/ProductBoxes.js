import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductBoxes = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductData, setSelectedProductData] = useState({});
  const [productPerBox, setProductPerBox] = useState(0);
  const [boxQuantiy, setBoxQuantiy] = useState(0);
  const [pallet, setPallet] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://43.154.22.219:3091/api/dev/office_accounts")
      .then((res) => setAccounts(res?.data))
      .catch((error) =>
        toast.error("Something went wrong for getting data from server")
      );
  }, []);

  const handleCheckboxClick = (productId) => {
    const selectedProduct = accounts.find(
      (product) => product.id === productId
    );
    setSelectedProductId(productId);
    setSelectedProductData(selectedProduct);
  };
  //   console.log(productPerBox, boxQuantiy);

  const formSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...selectedProductData,
      productPerBox,
      boxQuantiy,
      pallet,
    };
    toast.success("Data successfully uploaded");
    console.log(data);
  };

  return (
    <div>
      {/* Table data get from accouts input database */}
      <div className="mb-6 mt-3">
        <div className="bg-slate-500 p-2 rounded-lg uppercase flex items-center justify-around mb-4">
          <Link to="/exportimport" className="text-white flex">
            <BsArrowLeft className="w-20 lg:w-[380px] h-[35px] text-white" />
          </Link>
          <h1 className="text-center text-3xl text-info font-bold">
            Order Products Table
          </h1>
        </div>
        <div className="overflow-x-auto add__scrollbar">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
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
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-info"
                      name="product"
                      value={product.id}
                      checked={selectedProductId === product.id}
                      onClick={() => handleCheckboxClick(product.id)}
                    />
                  </td>
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

      {/* form design for products boxes */}
      <div className="mt-5 lg:flex justify-center items-center mb-4">
        <form className="card  shadow-xl mt-5" onSubmit={formSubmit}>
          <div className="lg:flex justify-between items-center">
            <div className="form-control card-body grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-center mt-7 mx-[35px] md:mx-0">
              <div>
                <label className="text-lg font-semibold" htmlFor="productName">
                  Product Name
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter Product Name"
                  type="text"
                  value={selectedProductData.productName || ""}
                  readOnly
                  onChange={(e) =>
                    setSelectedProductData({
                      ...selectedProductData,
                      productName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-lg font-semibold" htmlFor="productBrand">
                  Product Brnad
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter Product Brnad"
                  type="text"
                  readOnly
                  value={selectedProductData.productBrand || ""}
                  onChange={(e) =>
                    setSelectedProductData({
                      ...selectedProductData,
                      productBrand: e.target.value,
                    })
                  }
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
                  readOnly
                  value={selectedProductData.productModel || ""}
                  onChange={(e) =>
                    setSelectedProductData({
                      ...selectedProductData,
                      productModel: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label
                  className="text-lg font-semibold"
                  htmlFor="productQuantity">
                  Product Quantity
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter Product Quantity"
                  type="number"
                  readOnly
                  value={selectedProductData.productQuantity || ""}
                  onChange={(e) =>
                    setSelectedProductData({
                      ...selectedProductData,
                      productQuantity: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-lg font-semibold" htmlFor="date">
                  Date of Order
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Date"
                  type="date"
                  readOnly
                  value={selectedProductData.date || ""}
                  onChange={(e) =>
                    setSelectedProductData({
                      ...selectedProductData,
                      date: e.target.value,
                    })
                  }
                />
              </div>

              {/* Editable input field */}
              <div>
                <label
                  className="text-lg font-semibold"
                  htmlFor="productPerBox">
                  Product Per Box
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Per Box Product Quantity"
                  type="number"
                  name="productPerBox"
                  required
                  onChange={(e) => setProductPerBox(e.target.value)}
                />
              </div>
              <div>
                <label className="text-lg font-semibold" htmlFor="boxQuantiy">
                  How Many Boxes
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter Box Quantity"
                  type="number"
                  name="boxQuantiy"
                  required
                  onChange={(e) => setBoxQuantiy(e.target.value)}
                />
              </div>
              <div>
                <label className="text-lg font-semibold" htmlFor="boxQuantiy">
                  Number of Pallet
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter Pallent Quantity"
                  type="number"
                  name="pallet"
                  required
                  onChange={(e) => setPallet(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* button */}
          <div className="flex justify-end items-center mr-7 py-5">
            <button
              className="btn btn-info font-bold px-10 py-1 text-purple-950 hover:text-purple-800"
              type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductBoxes;
