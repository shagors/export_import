import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductBoxes = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedProductsData, setSelectedProductsData] = useState([]);
  const navigate = useNavigate();

  // for multiple product add
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedProductModels, setSelectedProductModels] = useState([]);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const [selectedProductPerBox, setSelectedProductPerBox] = useState(0);
  const [selectedProductPallet, setSelectedProductPallet] = useState(0);
  const [totalBox, setTotalBox] = useState(0);
  const [inputValues, setInputValues] = useState({});
  const [resultsValues, setResultsValues] = useState({});
  const [totalSum, setTotalSum] = useState(0);

  const [divs, setDivs] = useState(false);

  useEffect(() => {
    fetchAccounts();
    // total box count
    // const quantity = parseInt(selectedProductQuantity);
    // const productPerBox = parseInt(selectedProductPerBox);
    // const totalBox = Math.ceil(quantity / productPerBox);
    // setTotalBox(totalBox);
    // // all products input field count
    // let total = 0;
    // for (const model in selectedProductModels) {
    //   if (selectedProductModels[model]) {
    //     total += parseInt(inputValues[model]) || 0;
    //   }
    // }
    // setSelectedProductQuantity(total);
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

  // product name and product model map and filter for select options
  const products = accounts?.map((product) => product.productName) || [];

  const filteredProductModels = accounts
    .filter((account) => account.productName === selectedProductName)
    .map((account) => account.productModel);

  const handleProductModelCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedProductModels((prevSelectedModels) => ({
      ...prevSelectedModels,
      [value]: !prevSelectedModels[value],
    }));
  };

  const handleInputValueChange = (e) => {
    const name = e.target.name;
    const value = parseFloat(e.target.value);

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));

    const productModel = name;
    const perBoxValue = parseFloat(inputValues["perBoxProduct"]) || 0;
    const result = value * perBoxValue;

    setResultsValues((prevResultsValues) => ({
      ...prevResultsValues,
      [productModel]: result,
    }));

    // Calculate the new total sum
    const newTotalSum = Object.values(resultsValues).reduce(
      (sum, currentValue) => sum + (isNaN(currentValue) ? 0 : currentValue),
      0
    );

    setTotalSum(newTotalSum);
  };

  // const handleProductModelCheckboxChange = (e) => {
  //   const name = e.target.value;
  //   const checked = e.target.checked;

  //   if (checked) {
  //     setInputValues((prevInputValues) => ({
  //       ...prevInputValues,
  //       [`perBox_${name}`]: "",
  //     }));

  //     setMultiplicationResults((prevResults) => ({
  //       ...prevResults,
  //       [name]: 0,
  //     }));
  //   }

  //   // Handle selectedProductModels logic here

  //   // Calculate the sum of multiplication results
  //   const sum = Object.values(multiplicationResults).reduce(
  //     (acc, result) => acc + result,
  //     0
  //   );
  //   setSumResults(sum);
  // };

  // data send to server
  // http://localhost:5001/productbox
  const formSubmit = (e) => {
    e.preventDefault();
    const newData = {
      productName: selectedProductName,
      productModel: selectedProductModels,
      quantity: selectedProductQuantity,
      productPerBox: selectedProductPerBox,
      totalBox: totalBox,
      totalPallet: selectedProductPallet,
    };

    const data = [...selectedProductsData];

    // axios
    //   .post("http://localhost:5001/productbox", data)
    //   .then((res) => {
    //     toast.success("Successfully Uploaded to server");
    //     navigate("/exportimport");
    //     console.log(res);
    //   })
    //   .catch((err) =>
    //     toast.error("Error coming from server please try again later")
    //   );

    toast.success("Data successfully uploaded");
    console.log(newData);
  };

  console.log(totalSum);

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

                {/* if single products need */}
                {/* {selectedProductsData?.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    
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
                        name="quantity"
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
                        name="totalBox"
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
                        name="totalPallet"
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
                ))} */}

                {/* Products Add */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* product Name */}
                    <div className="">
                      <label className="text-lg font-semibold mb-3">
                        Product Name
                      </label>
                      <div className="input-group">
                        <select
                          className="select select-secondary w-full max-w-xs focus:outline-none"
                          value={selectedProductName}
                          name="productName"
                          onChange={(e) =>
                            setSelectedProductName(e.target.value)
                          }>
                          <option value="" className="mt-2">
                            Pick product Name
                          </option>
                          {products &&
                            products.map((product, index) => (
                              <option value={product} key={index}>
                                {product}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    {/* product Model */}
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
                          {filteredProductModels.map((productModel, index) => (
                            <option key={index}>{productModel}</option>
                          ))}
                        </select>
                      )}
                    </div> */}

                    <div className="">
                      <label className="text-lg font-semibold">
                        Select Models:
                      </label>
                      <div className="scrollable-container">
                        {filteredProductModels.map((productModel, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              className="mr-[6px] my-[3px] checkbox checkbox-xs checkbox-info"
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
                                name="perBoxProduct"
                                // name={`perBox_${productModel}`}
                                required
                                // value={""}
                                onBlur={handleInputValueChange}
                                placeholder="per Box"
                                className="w-[75px] ml-2 my-[3px] p-[6px] border border-b-blue-500 focus:outline-none"
                              />
                            )}

                            {selectedProductModels[productModel] && (
                              <input
                                type="text"
                                name={productModel}
                                required
                                value={inputValues[productModel] || ""}
                                onChange={handleInputValueChange}
                                placeholder={`Enter Quantity`}
                                className="w-[120px] mx-[18px] my-[3px] p-[6px] border border-b-blue-500 focus:outline-none"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* product per box */}
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

                    {/* Total Box */}
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
                        // value=""
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
                        type="number"
                        readOnly
                        value={totalSum}
                      />
                    </div>

                    {/* Pallet */}

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

                {/* Multiple Products Add */}
              </div>
            </div>
          </div>
          {/* button */}
          <div className="flex justify-end items-center mx-7 py-5 ">
            <p className="btn btn-info font-bold px-10 py-1 text-purple-950 hover:text-purple-800 mr-6">
              Add More Products
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
