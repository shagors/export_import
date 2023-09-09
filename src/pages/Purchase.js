import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/purchase.css";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import DatePicker from "react-datepicker";

const Purchase = () => {
  const [transportPath, setTransportPath] = useState([]);
  const [transportCountry, setTransportCountry] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [charges, setCharges] = useState([]);
  const [checks, setChecks] = useState([]);
  const [transportWay, setTransportWay] = useState("");
  const [transportCountryName, setTransportCountryName] = useState("");
  const [particularExpencessName, setParticularExpencessName] = useState([]);
  const [particularExpencessCost, setParticularExpencessCost] = useState([]);
  const [productChecks, setProductChecks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

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

  const handleToCheck = (e, index) => {
    setChecks([...checks, e.target.value]);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // console.log(checks);

  const handleTransportWay = (event) => {
    setTransportWay(event.target.value);
  };

  const handleTransportCountryName = (event) => {
    const selectedCountryName = event.target.value;
    setTransportCountryName(event.target.value);
    // console.log(transportCountryName);
  };

  const handleParticularExpencessName = (event) => {
    setParticularExpencessName(event.target.value);
  };
  const handleParticularExpencessCost = (event) => {
    setParticularExpencessCost(event.target.value);
  };

  const [cost, setCost] = useState({
    particularExpencessCost: charges.map(
      (charge) => charge.particularExpencessCost
    ),
  });
  const handleInputCostChange = (e) => {
    const value = parseFloat(e.target.value);
    setCost(...cost, { particularExpencessCost: value });
  };

  console.log(cost);

  const handleDelete = (id) => {
    axios
      .delete(
        `https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts/${id}`
      )
      .then((res) => {
        toast.success("Data Successfully Deleted!!");
        fetchAccounts();
      })
      .catch((error) => {
        toast.error("Something wrong can't delete");
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
    };

    console.log(data);

    // http://localhost:5001/purchase
    // https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/purchase_account

    // axios
    //   .post(
    //     "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/purchase_account",
    //     data
    //   )
    //   .then((res) => {
    //     toast.success("Successfully Uploaded to server");
    //     navigate("/exportimport");
    //     // console.log(res);
    //   })
    //   .catch((err) =>
    //     toast.error("This error coming from server please try again later!!")
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
          <div className="mt-8">
            <Link to="/exportimport" className="">
              <BsArrowLeft className="w-20 lg:w-[380px] h-[35px] text-purple-500" />
            </Link>
            <div className="w-8 h-[2px] bg-green-700 ml-[25px] lg:ml-[175px] animate-pulse"></div>
          </div>
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
              {/* particularExpencessName */}
              {/* particularExpenseName: ""*/}
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
                          onChange={handleParticularExpencessName}
                          // checked={isChecked}
                          // onChange={handleCheckboxChange}
                          onClick={handleToCheck}
                        />
                        <label className="label-text">
                          {charge.particularExpenseName}
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          className="border mr-2 required:border-red-600"
                          value={charge.particularExpenseCost}
                          onChange={handleInputCostChange}
                        />
                        <input type="text" className="border mr-2" />
                        <input type="date" className="border" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="form-control">
                  <div>
                    {charges?.map((charge) => (
                      <div key={charge.id}>
                        <input
                          type="checkbox"
                          id={charge.id}
                          name={charge.particularExpenseName}
                          className="my-[10px]"
                        />
                        <label
                          for={charge.particularExpenseName}
                          className="mx-2">
                          {charge.particularExpenseName}
                        </label>
                        <input
                          type="text"
                          name="charge.particularExpenseCost"
                          value={charge.particularExpenseCost}
                          className="border-b-[3px] border-b-black px-3 py-[3px] w-[90px] mr-3"
                        />
                        <input
                          type="text"
                          name="chargeRemark"
                          value=""
                          className="border-b-[3px] border-b-black px-3 py-[3px] w-[300px] mr-3"
                        />
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleSelectedDateChange}
                          dateFormat="MM/dd/yyyy"
                          placeholderText="MM/DD/YYYY"
                          required
                          className="border rounded-xl w-36 py-[18px] px-3 mt-1 text-gray-700 leading-tight"
                        />
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
              {/* button */}
              <div className="flex justify-end items-center mr-7 py-5">
                <p className="btn btn-info font-bold px-10 py-1 text-purple-950 hover:text-purple-800 mx-7">
                  Calculate
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
