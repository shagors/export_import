import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductBoxes = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedProductsData, setSelectedProductsData] = useState([]);
  const [productPerBox, setProductPerBox] = useState([]);
  const [boxQuantiy, setBoxQuantiy] = useState([]);
  const [pallet, setPallet] = useState([]);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [relatedBrands, setRelatedBrands] = useState([]);

  const [divs, setDivs] = useState(false);

  useEffect(() => {
    fetchAccounts();
    // if (selectedProduct) {
    //   axios
    //     .get(
    //       `https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts/[0]/${selectedProduct}`
    //     )
    //     .then((response) => {
    //       setRelatedBrands(response.data.brands);
    //     })
    //     .catch((error) => {
    //       toast.error("Error fetching data from server");
    //     });
    // }
  }, [selectedProduct]);

  console.log(selectedProduct);

  // const handleProductChange = (event) => {
  //   const newProduct = event.target.value;
  //   setSelectedProduct(newProduct);
  // };

  // const handleSelectedProductFilter = (productName) => {
  //   if (selectedProductIds.includes(productName)) {
  //     setSelectedProductIds(
  //       selectedProductIds.filter((id) => id !== productName)
  //     );
  //     setSelectedProductsData(
  //       selectedProductsData.filter((product) => product.id !== productName)
  //     );
  //   } else {
  //     const selectedProduct = accounts.find(
  //       (product) => product.id === productName
  //     );
  //     setSelectedProductIds([...selectedProductIds, productName]);
  //     setSelectedProductsData([...selectedProductsData, selectedProduct]);
  //   }
  // };

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

  const formSubmit = (e) => {
    e.preventDefault();
    const data = {
      selectedProductsData,
      productPerBox,
      boxQuantiy,
      pallet,
    };
    toast.success("Data successfully uploaded");
    console.log(data);
  };

  const toggleDivVisibility = () => {
    setDivs(!divs);
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
                <h2 className="text-center text-2xl font-semibold mb-5">
                  Selected Products
                </h2>
                {selectedProductsData.map((product) => (
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
                        onChange={(e) => setProductPerBox(e.target.value)}
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
                        onChange={(e) => setBoxQuantiy(e.target.value)}
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
                        onChange={(e) => setPallet(e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                {!divs ? (
                  ""
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {/* product Name */}
                    {/* <div className="">
                      <label
                        className="text-lg font-semibold"
                        htmlFor="productModel">
                        Product Name
                      </label>
                      <div className="input-group  flex lg:flex-none justify-center items-center">
                        <select
                          className="select select-info w-full max-w-xs"
                          id="selectOption"
                          value={selectedProduct}
                          onChange={handleProductChange}
                          name="productName">
                          <option value="">---- Pick product Name ----</option>
                          {accounts?.map((product, index) => (
                            <option
                              key={index}
                              value={product.productName.toLowerCase().trim()}>
                              {product.productName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div> */}
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
                        onChange={(e) => setProductPerBox(e.target.value)}
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
                        onChange={(e) => setBoxQuantiy(e.target.value)}
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
                        onChange={(e) => setPallet(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* button */}
          <div className="flex justify-end items-center mr-7 py-5 ">
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
