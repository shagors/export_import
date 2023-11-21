import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

const ProductBoxes = () => {
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState([]);
  const [boxProducts, setBoxProducts] = useState([]);
  const navigate = useNavigate();

  // for multiple product add
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedProductModels, setSelectedProductModels] = useState([]);
  const [selectedProductPallet, setSelectedProductPallet] = useState("");
  const [inputValues, setInputValues] = useState([]);
  const [perBoxProducts, setPerBoxProducts] = useState(0);
  const [singleBoxProducts, setSingleBoxProducts] = useState([]);
  const [singleProductQuantity, setSingleProductQuantity] = useState([]);
  const [resultsValues, setResultsValues] = useState(0);
  const [totalBox, setTotalBox] = useState(0);
  const [sessionData, setSessionData] = useState([]);
  const [sessionDataClone, setSessionDataClone] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [truckNumber, setTruckNumber] = useState("");
  const componentPDF = useRef();

  useEffect(() => {
    fetchProducts();
    fetchAccounts();
    fetchBoxProducts();
  }, [sessionData]);

  // products data fetch from server
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://grozziieget.zjweiting.com:3091/web-api-tht-1/api/dev/products"
      );
      setAccounts(response?.data);
    } catch (error) {
      toast.error("Error getting data from server!");
    }
  };

  // product Details fetch from server
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "https://grozziieget.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts"
      );
      setAccount(response?.data);
    } catch (error) {
      toast.error("Error getting data from server!");
    }
  };

  // product Details fetch from server
  const fetchBoxProducts = async () => {
    try {
      const response = await axios.get(
        "https://grozziieget.zjweiting.com:3091/web-api-tht-1/api/dev/product_in_boxes"
      );
      setBoxProducts(response?.data);
    } catch (error) {
      toast.error("Error getting data from server!");
    }
  };

  // product name and product model map and filter for select options
  const products = accounts?.map((product) => product.productName) || [];

  // if the prodcut select single then need use this function
  // const handleCheckboxClick = (productId) => {
  //   if (selectedProductIds.includes(productId)) {
  //     setSelectedProductIds(
  //       selectedProductIds.filter((id) => id !== productId)
  //     );
  //     setSelectedProductsData(
  //       selectedProductsData.filter((product) => product.id !== productId)
  //     );
  //   } else {
  //     const selectedProduct = accounts.find(
  //       (product) => product.id === productId
  //     );
  //     setSelectedProductIds([...selectedProductIds, productId]);
  //     setSelectedProductsData([...selectedProductsData, selectedProduct]);
  //   }
  // };

  // prodcut name select and filter out the product model
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
  // console.log(selectedProductModels);

  const selectedProductModelNames = Object.keys(selectedProductModels).filter(
    (modelName) => selectedProductModels[modelName]
  );

  // separe the new value from the array then map that array and store the details from there
  const singBoxPro = singleBoxProducts.map((newQ) => newQ.newQuantity);
  const singProQuan = singleProductQuantity.map((newQ) => newQ.newQuantity);

  const handleInputValueChange = (e) => {
    const name = e.target.name;
    const value = parseFloat(e.target.value);

    setInputValues((prevInputValues) => [
      {
        ...prevInputValues,
        [name]: value,
      },
    ]);

    if (name === "perBoxProduct") {
      const oldQuantity = perBoxProducts[name] || 0;
      const newQuantity = value;
      const boxSum = newQuantity + oldQuantity;
      setPerBoxProducts((prevPerBoxProducts) => ({
        ...prevPerBoxProducts,
        [name]: boxSum,
      }));

      // setSingleBoxProducts([oldQuantity, newQuantity]);
      setSingleBoxProducts((prevSingleBoxProducts) => [
        ...prevSingleBoxProducts,
        { oldQuantity, newQuantity },
      ]);
    }
    if (name === "quantityProduct") {
      const oldQuantity = resultsValues[name] || 0;
      const newQuantity = value;
      const productsum = value + oldQuantity;

      setResultsValues((prevResultsValues) => ({
        ...prevResultsValues,
        [name]: productsum,
      }));
      // setSingleProductQuantity([oldQuantity, newQuantity]);
      setSingleProductQuantity((prevSingleProductQuantity) => [
        ...prevSingleProductQuantity,
        { oldQuantity, newQuantity },
      ]);
    }
    setErrorMessage("");
  };

  const debouncedInputValueChange = debounce(handleInputValueChange, 800); // 300ms debounce

  // console.log(inputValues);

  // calculate the total box
  const handleCalculateData = () => {
    const totalBoxes = parseInt(
      Math.ceil(resultsValues.quantityProduct / perBoxProducts.perBoxProduct)
    );
    setTotalBox(totalBoxes);
    // const debouncedInputValueChange = debounce(handleInputValueChange, 800); // 300ms debounce
  };

  const handlePalletInputChange = (e) => {
    setSelectedProductPallet(e.target.value);
    setErrorMessage("");
  };

  const handleTruckNumberInputChange = (e) => {
    setTruckNumber(e.target.value);
    setErrorMessage("");
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

  const handleNameInputChange = (e) => {
    setSelectedProductName(e.target.value);
    setErrorMessage("");
  };

  // save the products for instant save and show the below table also for print
  const handleInstantStore = (e) => {
    e.preventDefault();
    // error handle
    // if (
    //   selectedProductPallet === "" ||
    //   selectedProductName === "" ||
    //   truckNumber === ""
    // ) {
    //   setErrorMessage("Please fill out all fields properly.");
    //   return;
    // }
    const newData = {
      productName: selectedProductName,
      productModel: selectedProductModelNames,
      quantity: resultsValues.quantityProduct,
      splitProductsBox: singBoxPro,
      splitQuantitySingleProduct: singProQuan,
      productPerBox: perBoxProducts.perBoxProduct,
      totalBox: totalBox,
      totalPallet: selectedProductPallet,
      truckNumber: truckNumber,
    };

    setSessionData((prevData) => [...prevData, newData]);
    setSessionDataClone((prevData) => [...prevData, newData]);
    setErrorMessage("");

    setSelectedProductName([]);
    setSelectedProductModels("");
    setPerBoxProducts({ perBoxProduct: 0 });
    setSingleBoxProducts([]);
    setSingleProductQuantity([]);
    setTotalBox(0);
    setResultsValues({ quantityProduct: 0 });
    setSelectedProductPallet("");
    setTruckNumber("");
  };

  // data send to server
  const formSubmit = async (e) => {
    e.preventDefault();
    // map for data convert to stringify
    sessionDataClone?.forEach((element, index) => {
      // const jsonProductModelString = JSON.stringify(
      //   element?.productModel?.map((str) => `${str}`)
      // );
      // console.log(jsonProductModelString);
      // element.productModel = `"${jsonProductModelString}"`;
      // element.productModel = JSON.stringify(jsonProductModelString);
      // element.productModel = `"${element.productModel}"`;
      element.productModel = JSON.stringify(element.productModel);
      // console.log(element.productModel);

      // const jsonSplitProductsBoxString = JSON.stringify(
      //   element?.splitProductsBox?.map((str) => `${str}`)
      // );
      // element.splitProductsBox = `"${jsonSplitProductsBoxString}"`;
      element.splitProductsBox = JSON.stringify(element.splitProductsBox);
      // console.log(element.splitProductsBox);

      // const jsonSplitQuantitySingleProductString = JSON.stringify(
      //   element?.splitQuantitySingleProduct?.map((str) => `${str}`)
      // );
      // element.splitQuantitySingleProduct = `"${jsonSplitQuantitySingleProductString}"`;
      element.splitQuantitySingleProduct = JSON.stringify(
        element.splitQuantitySingleProduct
      );
      // console.log(element.splitQuantitySingleProduct);
    });
    // for loop use for data single pass from the array
    for (const item of sessionDataClone) {
      // console.log(item);
      const { productModel, splitQuantitySingleProduct } = item;
      const modelParse = JSON.parse(productModel);
      const filterModel = modelParse?.map((m) => m);
      // const filterModel = "TP210A";
      // console.log(filterModel);
      const quantityParse = JSON.parse(splitQuantitySingleProduct);
      const productQuantity = quantityParse?.map((q) => q);
      // const productQuantity = 100;
      // console.log(productQuantity);
      const modelArr = filterModel;
      const quantityArr = productQuantity;
      // Function to pair elements from two arrays and create an array of formatted strings
      // const formatModelWithQuantity = (modelArr, quantityArr) => {
      //   const formattedData = [];
      //   // Ensure both arrays are of the same length
      //   if (modelArr.length === quantityArr.length) {
      //     for (let i = 0; i < modelArr.length; i++) {
      //       const formatted = `${modelArr[i]}:${quantityArr[i]}`;
      //       formattedData.push(formatted);
      //     }
      //   } else {
      //     console.error("Arrays must have the same length.");
      //   }
      //   return formattedData;
      // };
      // // Creating the array of formatted strings
      // const modelWithQuantity = formatModelWithQuantity(model, quantity);
      // // Displaying fruits with prices
      // modelWithQuantity.forEach((data) => {
      //   console.log(data);
      // });

      // Transforming the arrays into an array of objects
      const productData = modelArr?.map((model, index) => ({
        productModel: model,
        productQuantity: quantityArr[index],
      }));
      // console.log(productData);
      try {
        // main post data send to API
        const response = await axios.post(
          "https://grozziieget.zjweiting.com:3091/web-api-tht-1/api/dev/product_in_boxes",
          item,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status !== 201) {
          throw new Error("Network response was not ok");
        }

        // This API patch API data send to accounts API and calculate the product Quantityand
        const sendIndividualEntries = async () => {
          for (const entry of productData) {
            try {
              await axios.patch(
                "https://grozziieget.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts/sub",
                entry
              );
            } catch (error) {
              toast.error("Network Error. Please try again later", {
                position: "top-center",
              });
            }
          }
        };
        sendIndividualEntries();

        // this is test for data send
        // axios
        //   .patch(
        //     `https://grozziieget.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts/sub`,
        //     productData[0]
        //   )
        //   .then((res) => {
        //     toast.success("Product Quantity Updated", {
        //       position: "top-center",
        //     });
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //     toast.error("Error updating quantity", {
        //       position: "top-center",
        //     });
        //   });
        toast.success("Successfully Uploaded to server", {
          position: "top-center",
        });
        navigate("/exportimport");
      } catch (error) {
        toast.error("Network Error. Please try again later", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div>
      {/* form design for products boxes */}
      <div className="mt-5 lg:flex justify-center items-center mb-4">
        <form className="card shadow-xl mt-5 p-3" onSubmit={handleInstantStore}>
          <h2 className="text-4xl font-bold text-violet-500 text-center mt-3">
            Products Listed For Export
          </h2>
          <div className="lg:flex justify-between items-center">
            <div className="form-control card-body">
              <div className="w-full">
                {/* Products Add */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* product Name */}
                    <div className="mt-2 md:mt-0">
                      <label className="text-lg font-semibold mb-3">
                        Product Name
                      </label>
                      <div className="input-group">
                        <select
                          className="select select-secondary w-full focus:outline-none"
                          value={selectedProductName}
                          name="productName"
                          required
                          aria-required
                          onChange={handleNameInputChange}
                          // onChange={(e) =>
                          //   setSelectedProductName(e.target.value)
                          // }
                        >
                          <option value="" className="mt-2">
                            Pick product Name
                          </option>
                          {/* {products &&
                            products.map((product, index) => (
                              <option value={product} key={index}>
                                {product}
                              </option>
                            ))} */}
                          {Array.from(
                            new Set(
                              accounts?.map((product) => product.productName)
                            )
                          ).map((productName, index) => (
                            <option key={index} value={productName}>
                              {productName}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                      )}
                    </div>

                    {/* product Model */}
                    <div className="w-full mx-[2px]">
                      <label className="text-lg font-semibold">
                        Select Models:
                      </label>
                      <div className="w-full">
                        {filteredProductModels?.map((productModel, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              className="mr-[4px] my-[3px] checkbox checkbox-xs checkbox-info"
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
                                type="number"
                                min="0"
                                name="perBoxProduct"
                                required
                                aria-required
                                onWheel={(e) => e.target.blur()}
                                // onBlur={handleInputValueChange}
                                // onChange={handleInputValueChange}
                                onChange={debouncedInputValueChange}
                                placeholder="per Box"
                                className="w-[100px] ml-2 my-[3px] p-[6px] border border-b-blue-500 focus:outline-none"
                              />
                            )}

                            {selectedProductModels[productModel] && (
                              <input
                                type="number"
                                min="0"
                                name="quantityProduct"
                                required
                                aria-required
                                onWheel={(e) => e.target.blur()}
                                // onBlur={handleInputValueChange}
                                // onChange={handleInputValueChange}
                                onChange={debouncedInputValueChange}
                                placeholder="Product Quantity"
                                className="w-[170px] mx-[18px] my-[3px] p-[6px] border border-b-blue-500 focus:outline-none"
                              />
                            )}
                            {}
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
                        placeholder="Data coming form Per Box Total Sum"
                        type="number"
                        name="productPerBox"
                        required
                        aria-required
                        value={perBoxProducts.perBoxProduct}
                        readOnly
                        // onChange={(e) =>
                        //   setSelectedProductPerBox(e.target.value)
                        // }
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
                        min="0"
                        readOnly
                        required
                        aria-required
                        name="boxQuantiy"
                        value={totalBox}
                        onChange={(e) => setTotalBox(e.target.value)}
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
                        placeholder="Total product"
                        type="number"
                        min="0"
                        required
                        aria-required
                        readOnly
                        value={resultsValues.quantityProduct}
                        name="quantity"
                        // onClick={handleInputValueChange}
                      />
                    </div>

                    {/* Pallet */}
                    <div className="">
                      <label
                        className="text-lg font-semibold"
                        htmlFor="boxQuantiy">
                        Pallet Number
                      </label>
                      <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Enter Pallent Number"
                        type="text"
                        name="pallet"
                        required
                        aria-required
                        onChange={handlePalletInputChange}
                        // onChange={(e) =>
                        //   setSelectedProductPallet(e.target.value)
                        // }
                      />
                      {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                      )}
                    </div>

                    {/* Truck Number */}
                    <div className="">
                      <label
                        className="text-lg font-semibold"
                        htmlFor="boxQuantiy">
                        Truck Number
                      </label>
                      <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Enter Pallent Quantity"
                        type="text"
                        name="truckNumber"
                        required
                        aria-required
                        onChange={handleTruckNumberInputChange}
                      />
                      {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* button */}
          <div className="flex flex-col md:flex-row justify-end items-center mx-7 py-5">
            <Link
              to="/exportimport"
              className="btn btn-info font-bold px-6 py-1 text-purple-950 hover:text-purple-800 mr-6">
              Back
            </Link>
            <p
              className="btn btn-info font-bold px-6 py-1 text-purple-950 hover:text-purple-800 mr-6 mt-3 md:my-0"
              onClick={handleCalculateData}>
              Calculate
            </p>
            <button
              className="btn btn-info font-bold px-6 py-1 text-purple-950 hover:text-purple-800 mr-6 mt-3 md:my-0"
              type="submit">
              Add Products
            </button>
            {sessionData.length > 0 ? (
              <button
                className={`btn btn-info font-bold px-6 py-1 text-purple-950 hover:text-purple-800 mt-3 md:my-0`}
                onClick={formSubmit}>
                Save
              </button>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>

      {/* instant save Data */}
      <div className="my-7">
        <h1 className="text-center font-bold text-2xl text-info shadow-lg rounded p-2">
          Temporary List for Export Products
        </h1>

        <div
          className="overflow-x-auto add__scrollbar"
          ref={componentPDF}
          style={{ width: "100%" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Model</th>
                <th>Split Product</th>
                <th>Split Quantity</th>
                <th>Product Per Box</th>
                <th>Total Box</th>
                <th>Quantity</th>
                <th>Pallet</th>
                <th>Truck NO.</th>
              </tr>
            </thead>
            <tbody>
              {sessionData?.map((item, index) => {
                const model = item.productModel?.map((model) => model) || "";
                const modelSplit = model.join(",");
                const findProductsForSplit =
                  item.splitProductsBox?.map((box) => box) || "";
                const getSplitProducts = findProductsForSplit.join(",");
                const findProductQuantitySplit =
                  item.splitQuantitySingleProduct?.map((quan) => quan) || "";
                const getSplitQuantity = findProductQuantitySplit.join(",");
                return (
                  <tr className="hover cursor-pointer" key={index}>
                    <td>{item.productName}</td>
                    <td>{modelSplit}</td>
                    <td>{getSplitProducts}</td>
                    <td>{getSplitQuantity}</td>
                    <td>{item.productPerBox}</td>
                    <td>{item.totalBox}</td>
                    <td>{item.quantity}</td>
                    <td>{item.totalPallet}</td>
                    <td>{item.truckNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <button
          className="btn-info font-bold px-7 py-2 mt-4 rounded-lg text-purple-950 hover:text-amber-500"
          onClick={handlePrint}>
          Print
        </button> */}
      </div>
    </div>
  );
};

export default ProductBoxes;
