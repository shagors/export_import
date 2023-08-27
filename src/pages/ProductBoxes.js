import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductBoxes = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedProductsData, setSelectedProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const navigate = useNavigate();

  // for multiple product add
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedProductModels, setSelectedProductModels] = useState([]);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const [selectedProductPerBox, setSelectedProductPerBox] = useState(0);
  const [selectedProductPallet, setSelectedProductPallet] = useState(0);
  const [totalBox, setTotalBox] = useState(0);
  const [inputValues, setInputValues] = useState({});

  const [divs, setDivs] = useState(false);

  useEffect(() => {
    fetchAccounts();
    // total box count
    const quantity = parseFloat(selectedProductQuantity);
    const productPerBox = parseFloat(selectedProductPerBox);
    const totalBox = Math.ceil(quantity / productPerBox);
    setTotalBox(totalBox);
    // all products input field count
    let total = 0;
    for (const model in selectedProductModels) {
      if (selectedProductModels[model]) {
        total += parseInt(inputValues[model]) || 0;
      }
    }
    setSelectedProductQuantity(total);
  }, [
    selectedProductQuantity,
    selectedProductPerBox,
    selectedProductModels,
    inputValues,
  ]);

  // data fetch from server
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts"
      );
      setAccounts(response?.data);
    } catch (error) {
      toast.error("Error getting data from server!");
    }
  };

  const handleProductChange = (event) => {
    const newProduct = event.target.value;
    setSelectedProduct(newProduct);
  };

  const handleCheckboxClick = (productId) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(
        selectedProductIds.filter((id) => id !== productId)
      );
      setSelectedProductsData(
        selectedProductsData.filter((product) => product.id !== productId)
      );
    } else {
      const selectedProduct = accounts.find(
        (product) => product.id === productId
      );
      setSelectedProductIds([...selectedProductIds, productId]);
      setSelectedProductsData([...selectedProductsData, selectedProduct]);
    }
  };

  const toggleDivVisibility = () => {
    setDivs(!divs);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const newData = {
      productName: selectedProductName,
      productModels: selectedProductModels,
      quantity: selectedProductQuantity,
      productPerBox: selectedProductPerBox,
      totalBox: totalBox,
      totalPallet: selectedProductPallet,
    };

    const data = {
      ...selectedProductsData,
      newData,
    };

    toast.success("Data successfully uploaded");
    console.log(data);
  };

  // product name and product model map and filter for select options
  const products = accounts?.map((product) => product.productName) || [];

  const filteredProductModels = accounts
    .filter((account) => account.productName === selectedProductName)
    .map((account) => account.productModel);

  // multiple checkbox select options add
  // const handleProductModelCheckboxChange = (e) => {
  //   const value = e.target.value;
  //   if (selectedProductModels.includes(value)) {
  //     setSelectedProductModels(
  //       selectedProductModels.filter((model) => model !== value)
  //     );
  //   } else {
  //     setSelectedProductModels([...selectedProductModels, value]);
  //   }
  // };

  const handleProductModelCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedProductModels((prevSelectedModels) => ({
      ...prevSelectedModels,
      [value]: !prevSelectedModels[value],
    }));
  };

  const handleInputValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  // console.log(selectedProductModels);

  return (
    <div>
      {/* Table data get from accouts input database */}
      <div className="mb-6 mt-3">
        <div className="bg-slate-500 p-2 rounded-lg uppercase flex items-center justify-between mb-4">
          <Link to="/exportimport" className="text-white flex">
            <BsArrowLeft className="w-20 lg:w-[380px] h-[35px] text-white" />
          </Link>
          <h1 className="text-center text-3xl text-info font-bold mr-10">
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
                      checked={selectedProductIds.includes(product.id)}
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
            <div className="form-control card-body">
              <div className="w-full">
                <h2 className="text-center text-3xl font-semibold mb-5">
                  Selected Products
                </h2>
                {selectedProductsData?.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {/* product Name */}
                    <div>
                      <label
                        className="text-lg font-semibold"
                        htmlFor="productName">
                        Product Name
                      </label>
                      <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Enter Product Name"
                        type="text"
                        value={product.productName || ""}
                        readOnly
                        onChange={(e) => {
                          const updatedProductsData = selectedProductsData.map(
                            (p) =>
                              p.id === product.id
                                ? { ...p, productName: e.target.value }
                                : p
                          );
                          setSelectedProductsData(updatedProductsData);
                        }}
                      />
                    </div>
                    {/* product Brand */}
                    <div>
                      <label
                        className="text-lg font-semibold"
                        htmlFor="productModel">
                        Product Model
                      </label>
                      <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Enter Product Name"
                        type="text"
                        value={product.productModel || ""}
                        readOnly
                        onChange={(e) => {
                          const updatedProductsData = selectedProductsData.map(
                            (p) =>
                              p.id === product.id
                                ? { ...p, productModel: e.target.value }
                                : p
                          );
                          setSelectedProductsData(updatedProductsData);
                        }}
                      />
                    </div>
                    {/* product Quantity */}
                    <div>
                      <label
                        className="text-lg font-semibold"
                        htmlFor="productQuantity">
                        Product Quantity
                      </label>
                      <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Enter Product Name"
                        type="text"
                        value={product.productQuantity || ""}
                        onChange={(e) => {
                          const updatedProductsData = selectedProductsData.map(
                            (p) =>
                              p.id === product.id
                                ? { ...p, productQuantity: e.target.value }
                                : p
                          );
                          setSelectedProductsData(updatedProductsData);
                        }}
                      />
                    </div>

                    {/* Editable field */}
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
                        // onChange={(e) => setProductPerBox(e.target.value)}
                        onChange={(e) => {
                          const updatedProductsData = selectedProductsData.map(
                            (p) =>
                              p.id === product.id
                                ? { ...p, productPerBox: e.target.value }
                                : p
                          );
                          setSelectedProductsData(updatedProductsData);
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="text-lg font-semibold"
                        htmlFor="boxQuantiy">
                        How Many Boxes
                      </label>
                      <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Enter Box Quantity"
                        type="number"
                        name="boxQuantiy"
                        required
                        // onChange={(e) => setBoxQuantiy(e.target.value)}
                        onChange={(e) => {
                          const updatedProductsData = selectedProductsData.map(
                            (p) =>
                              p.id === product.id
                                ? { ...p, boxQuantiy: e.target.value }
                                : p
                          );
                          setSelectedProductsData(updatedProductsData);
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="text-lg font-semibold"
                        htmlFor="boxQuantiy">
                        Number of Pallet
                      </label>
                      <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Enter Pallent Quantity"
                        type="text"
                        name="pallet"
                        required
                        // onChange={(e) => setPallet(e.target.value)}
                        onChange={(e) => {
                          const updatedProductsData = selectedProductsData.map(
                            (p) =>
                              p.id === product.id
                                ? { ...p, pallet: e.target.value }
                                : p
                          );
                          setSelectedProductsData(updatedProductsData);
                        }}
                      />
                    </div>
                  </div>
                ))}

                {/* Multiple Products Add */}

                {!divs ? (
                  ""
                ) : (
                  <div>
                    <p className="text-center font-semibold text-xl my-4 text-purple-500">
                      Multiple Products Selection
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {/* product Name */}
                      <div className="">
                        <label className="text-center mb-3">
                          <span className="lebel-text text-lg font-semibold">
                            Product Name
                          </span>
                        </label>
                        <div className="input-group  flex lg:flex-none justify-center items-center">
                          <select
                            className="select select-info w-full max-w-xs"
                            value={selectedProductName}
                            name="productName"
                            onChange={(e) =>
                              setSelectedProductName(e.target.value)
                            }>
                            <option value="">Pick product Name</option>
                            {products &&
                              products.map((product, index) => (
                                <option value={product} key={index}>
                                  {product}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      {/* product Brand */}
                      {/* <div>
                        <label
                          className="text-lg font-semibold"
                          htmlFor="productQuantity">
                          Product Model
                        </label>
                        {filteredProductModels.length > 0 && (
                          <select
                            className="select select-info w-full max-w-xs"
                            value={selectedProductModels}
                            name="productName"
                            onChange={(e) =>
                              setSelectedProductModels(e.target.value)
                            }>
                            <option value="">Choose product Model</option>
                            {filteredProductModels.map(
                              (productModel, index) => (
                                <option key={index}>{productModel}</option>
                              )
                            )}
                          </select>
                        )}
                      </div> */}

                      <div>
                        <label className="text-lg font-semibold">
                          Select Models:
                        </label>
                        {filteredProductModels.map((productModel, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              className="checkbox checkbox-info mr-2 my-1"
                              type="checkbox"
                              value={productModel}
                              checked={
                                selectedProductModels[productModel] || false
                              }
                              onChange={handleProductModelCheckboxChange}
                            />
                            <span>{productModel}</span>
                            {selectedProductModels[productModel] && (
                              <input
                                type="text"
                                name={productModel}
                                value={inputValues[productModel] || ""}
                                onChange={handleInputValueChange}
                                placeholder={`Enter ${productModel} Quantity`}
                                className="mx-5 my-1 p-[6px] border border-b-blue-500 focus:outline-none"
                              />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* product Quantity */}
                      <div>
                        <label
                          className="text-lg font-semibold"
                          htmlFor="productQuantity">
                          Product Quantity
                        </label>
                        <input
                          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                          placeholder="Enter Product Name"
                          type="number"
                          readOnly
                          value={selectedProductQuantity}
                        />
                      </div>

                      {/* Editable field */}
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
                          onChange={(e) =>
                            setSelectedProductPerBox(e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="text-lg font-semibold"
                          htmlFor="boxQuantiy">
                          How Many Boxes
                        </label>
                        <input
                          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                          type="number"
                          name="boxQuantiy"
                          readOnly
                          value={totalBox}
                        />
                      </div>
                      <div>
                        <label
                          className="text-lg font-semibold"
                          htmlFor="boxQuantiy">
                          Number of Pallet
                        </label>
                        <input
                          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                          placeholder="Enter Pallent Quantity"
                          type="text"
                          name="pallet"
                          required
                          onChange={(e) =>
                            setSelectedProductPallet(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* button */}
          <div className="flex justify-end items-center mx-7 py-5 ">
            <p
              className="btn btn-info font-bold px-10 py-1 text-purple-950 hover:text-purple-800 mr-6"
              onClick={toggleDivVisibility}>
              Multiple Products Order
            </p>
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
