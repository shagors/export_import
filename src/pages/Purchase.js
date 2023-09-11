import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/purchase.css";
import { AiOutlineDelete } from "react-icons/ai";

const Purchase = () => {
  const [transportPath, setTransportPath] = useState([]);
  const [transportCountry, setTransportCountry] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [charges, setCharges] = useState([]);
  const [checks, setChecks] = useState([]);
  const [transportWay, setTransportWay] = useState("");
  const [transportCountryName, setTransportCountryName] = useState("");
  const [particularExpencessName, setParticularExpencessName] = useState([]);
  const [productChecks, setProductChecks] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const chaecksCost = JSON.stringify(checks);
  const productData = JSON.stringify(productChecks);

  // Data fetch from server
  useEffect(() => {
    //   getting transport data from server
    fetchTransportRoute();
    //   getting transport country data from server
    fetchTransportCountry();
    //   getting accounts data from office_accounts server
    fetchAccounts();
    // geeting charges api call
    fetchCharges();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts"
      );
      setAccounts(response?.data);
    } catch (error) {
      toast.error("Error from server to get data!!");
    }
  };
  const fetchCharges = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/addcharges"
      );
      setCharges(response?.data);
    } catch (error) {
      toast.error("Error from server to get data!!");
    }
  };
  const fetchTransportCountry = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/transport_country"
      );
      setTransportCountry(response?.data);
    } catch (error) {
      toast.error("Error from server to get data!!");
    }
  };
  const fetchTransportRoute = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/transport"
      );
      setTransportPath(response?.data);
    } catch (error) {
      toast.error("Error from server to get data!!");
    }
  };

  const handleProductCheck = (product) => {
    setProductChecks([...productChecks, product.id]);
  };

  // select the particulars
  const handleToCheck = (e) => {
    setChecks([...checks, e.target.value]);
  };

  // fiter with id that id checks or not
  const filteredData = charges.filter((item) =>
    checks.includes(item.id.toString())
  );

  // store that ids cost value in this function
  const particularExpenseCosts = filteredData.map(
    (item) => item.particularExpenseCost
  );

  // map those value which is selected
  const costsAsNumbers = particularExpenseCosts.map((cost) => parseFloat(cost));

  // calculate this value and get output
  const totalCost = costsAsNumbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const handleTransportWay = (event) => {
    setTransportWay(event.target.value);
  };

  const handleTransportCountryName = (event) => {
    setTransportCountryName(event.target.value);
  };

  // const handleParticularExpencessName = (event) => {
  //   setParticularExpencessName(event.target.value);
  // };

  const [expenses, setExpenses] = useState([]);
  const [inputFieldsVisibility, setInputFieldsVisibility] = useState({});

  // check the data by ID
  const handleCheckboxChange = (chargeId) => {
    setInputFieldsVisibility((prevState) => ({
      ...prevState,
      [chargeId]: !prevState[chargeId],
    }));
  };

  //
  const handleRemarkChange = (id, value) => {
    const data = { id, value };
    console.log(id, value);
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, remark: [value] } : expense
      )
    );
  };

  const handleDateChange = (id, value) => {
    console.log(id, value);
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, date: value } : expense
      )
    );
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const data = {};
  };

  console.log(expenses);

  const handleDelete = (id) => {
    axios
      .delete(
        `https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts/${id}`
      )
      .then((res) => {
        toast.success("Data Successfully Deleted!!", {
          position: "top-center",
        });
        fetchAccounts();
      })
      .catch((error) => {
        toast.error("Something wrong can't delete", { position: "top-center" });
      });
  };

  // save data
  const formSubmit = (e) => {
    e.preventDefault();
    const data = {
      transportWayId: transportWay,
      transportCountryId: transportCountryName,
      addChargesId: chaecksCost,
      officeAccountId: productData,
      totalCost,
    };

    toast.success("Data Successfully uploaded!", { position: "top-center" });
    console.log(data);

    // http://localhost:5001/purchase
    // https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/purchase_account

    // axios
    //   .post(
    //     "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/purchase_account",
    //     data
    //   )
    //   .then((res) => {
    //     toast.success("Successfully Uploaded to server", { position: "top-center" });
    //     navigate("/exportimport");
    //     // console.log(res);
    //   })
    //   .catch((err) =>
    //     toast.error("This error coming from server please try again later!!", { position: "top-center" })
    //   );
  };

  return (
    <>
      <div className="mb-6">
        {/* top form select and checkbox design */}
        <div className="">
          <h1 className="flex justify-center items-center text-4xl my-4 uppercase text-info font-bold">
            Add Shipment Data :
          </h1>
          <div className="mt-5 lg:flex justify-center items-center">
            <form className="bg-base-100 shadow-xl mt-5" onSubmit={formSubmit}>
              <div className="md:flex justify-between items-center">
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
                      value={transportWay}
                      name="transportWay"
                      onChange={handleTransportWay}>
                      <option value="">---- Pick Transport Way ----</option>
                      {transportPath?.map((product, index) => (
                        <option value={product.id} key={index}>
                          {product.transportWay}
                        </option>
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
                      value={transportCountryName}
                      name="transportCountryName"
                      onChange={handleTransportCountryName}>
                      <option value="">---- Pick Shipment Country ----</option>
                      {transportCountry?.map((product, index) => (
                        <option value={product.id} key={index}>
                          {product.countryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* Tax and costing */}
              <div className="w-70 p-9 add__scrollbar">
                <div className="form-control">
                  {charges?.map((charge) => (
                    <div key={charge.id} className="flex justify-between gap-3">
                      <div className="cursor-pointer flex items-center">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-info my-[3px] mr-3"
                          id={charge.id}
                          value={charge.id}
                          name="particularExpenseName"
                          // onChange={handleParticularExpencessName}
                          onChange={() => handleCheckboxChange(charge.id)}
                          onClick={handleToCheck}
                        />
                        <label className="label-text">
                          {charge.particularExpenseName}
                        </label>
                      </div>
                      {/* <div>
                        <input
                          type="text"
                          className="border mr-2 required:border-red-600"
                          value={charge.particularExpenseCost}
                        />
                        <input
                          type="text"
                          className="border mr-2"
                          name={`${charge.particularExpenseName.replace(
                            /\s/g,
                            ""
                          )}Remark`}
                        />
                        <input
                          type="date"
                          className="border"
                          name={`${charge.particularExpenseName.replace(
                            /\s/g,
                            ""
                          )}Date`}
                        />
                      </div> */}
                      {inputFieldsVisibility[charge.id] && (
                        <div>
                          <input
                            type="text"
                            className="border mr-2 required:border-red-600 w-[115px] text-center"
                            value={charge.particularExpenseCost}
                          />
                          <input
                            type="text"
                            className="border mr-2"
                            name={`${charge.particularExpenseName.replace(
                              /\s/g,
                              ""
                            )}Remark`}
                            onChange={(e) =>
                              handleRemarkChange(charge.id, e.target.value)
                            }
                          />
                          <input
                            type="date"
                            className="border"
                            name={`${charge.particularExpenseName.replace(
                              /\s/g,
                              ""
                            )}Date`}
                            onChange={(e) =>
                              handleDateChange(charge.id, e.target.value)
                            }
                          />
                          <button
                            className="bg-teal-300 font-bold ml-2 px-[10px] py-[3px] rounded-md"
                            onClick={handleAdd}>
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-5 text-center font-semibold text-md">
                Total Cost:
                <span className="text-emerald-600 text-2xl"> {totalCost}</span>
              </p>
              {/* button */}
              <div className="mt-3 mr-7 flex justify-end gap-y-4">
                <Link to="/exportimport" className="btn btn-info px-10 mx-5">
                  Back
                </Link>
                <button
                  className="btn btn-info px-10 active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-lg bg-violet-500 text-white font-bold hover:text-black mb-6"
                  type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Table data get from accouts input database */}
        <div>
          <h1 className="text-center my-6 text-3xl text-info font-bold bg-slate-500 p-3 rounded-lg uppercase">
            Data Get From accounts Page
          </h1>
          <div className="overflow-x-auto add__scrollbar">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Select</th>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Product Brand</th>
                  <th>Product Model</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts?.map((product) => (
                  <tr className={`hover cursor-pointer`} key={product.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        name="product"
                        value={product.id}
                        onClick={() => handleProductCheck(product)}
                      />
                    </td>
                    <td>{product.id}</td>
                    <td>{product.productName}</td>
                    <td>{product.productBrand}</td>
                    <td>{product.productModel}</td>
                    <td>{product.productQuantity}</td>
                    <td>{product.date}</td>
                    <td>
                      <button onClick={() => handleDelete(product?.id)}>
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
    </>
  );
};

export default Purchase;
