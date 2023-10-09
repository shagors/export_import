import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/purchase.css";
import { AiOutlineDelete } from "react-icons/ai";
import ExpensesForm from "./PurchaseCalculation";

const Purchase = () => {
  const [transportPath, setTransportPath] = useState([]);
  const [transportCountry, setTransportCountry] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [charges, setCharges] = useState([]);
  const [transportWay, setTransportWay] = useState("");
  const [transportCountryName, setTransportCountryName] = useState("");
  const [productChecks, setProductChecks] = useState([]);
  const [savedExpenses, setSavedExpenses] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [total, setTotal] = useState("");
  const [ipNo, setIpNo] = useState("");
  const [truckNo, setTruckNo] = useState("");

  const navigate = useNavigate();

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

  // below table products select checkbox
  const handleProductCheck = (product) => {
    setProductChecks([...productChecks, product.id]);
  };

  const handleTransportWay = (event) => {
    setTransportWay(event.target.value);
  };

  const handleTransportCountryName = (event) => {
    setTransportCountryName(event.target.value);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts/${id}`
      )
      .then((res) => {
        toast.warn("Data Successfully Deleted!!", {
          position: "top-center",
        });
        fetchAccounts();
      })
      .catch((error) => {
        toast.error("Something wrong can't delete", { position: "top-center" });
      });
  };

  const handleExpenseSave = (selectedExpenseData) => {
    setSavedExpenses(selectedExpenseData);
  };

  const handleTotalCostChange = (newTotalCost) => {
    setTotalCost(newTotalCost);
  };

  // data send to server
  const formSubmit = (e) => {
    e.preventDefault();
    const data = {
      transportWay: transportWay, // id pass
      transportCountryName: transportCountryName, // id pass
      officeAccount: productData, //id pass
      particularExpenseNames: savedExpenses,
      totalCost: totalCost,
      invoiceNo: invoiceNo,
      total: total,
      ipNo: ipNo,
      truckNo: truckNo,
    };
    // console.log(data);
    axios
      .post(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/purchase",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Successfully Uploaded to server", {
          position: "top-center",
        });
        navigate("/exportimport");
        // console.log(res);
      })
      .catch((err) =>
        toast.error("This error coming from server please try again later!!", {
          position: "top-center",
        })
      );
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
            <form
              className="bg-base-100 rounded-lg shadow-xl mt-5"
              onSubmit={formSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Shipment Way */}
                <div className="form-control  card-body">
                  <label className="mb-[10px] lebel-text text-lg font-semibold">
                    Shipment Way
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

                {/* Shipment Country */}
                <div className="form-control card-body">
                  <label className="mb-[10px] lebel-text text-lg font-semibold">
                    Shipment Country
                  </label>
                  <div className="input-group flex lg:flex-none justify-center items-center">
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

                {/* Invoice No. */}
                <div className="form-control card-body">
                  <div>
                    <label
                      className="lebel-text text-lg font-semibold"
                      htmlFor="invoiceno">
                      Invoice No.
                    </label>
                    <input
                      className="w-full border-[1px] border-info rounded-md p-3 mt-3 bg-transparent"
                      placeholder="Invoice No"
                      type="text"
                      name="invoiceno"
                      value={invoiceNo}
                      required
                      onChange={(e) => setInvoiceNo(e.target.value)}
                    />
                  </div>
                </div>

                {/* IP No. */}
                <div className="form-control card-body">
                  <div>
                    <label className="text-lg font-semibold" htmlFor="ipNo">
                      IP No.
                    </label>
                    <input
                      className="w-full border-[1px] border-info rounded-md p-3 mt-3 bg-transparent"
                      placeholder="IP No."
                      type="text"
                      name="ipNo"
                      value={ipNo}
                      required
                      onChange={(e) => setIpNo(e.target.value)}
                    />
                  </div>
                </div>

                {/* Truck No. */}
                <div className="form-control card-body">
                  <div>
                    <label className="text-lg font-semibold" htmlFor="ipNo">
                      Truck No.
                    </label>
                    <input
                      className="w-full border-[1px] border-info rounded-md p-3 mt-3 bg-transparent"
                      placeholder="Truck No."
                      type="text"
                      name="truckNo"
                      value={truckNo}
                      required
                      onChange={(e) => setTruckNo(e.target.value)}
                    />
                  </div>
                </div>

                {/* Total (USD) */}
                <div className="form-control card-body">
                  <div>
                    <label className="text-lg font-semibold" htmlFor="total">
                      Total <span className="text-red-600">(USD)</span>
                    </label>
                    <input
                      className="w-full border-[1px] border-info rounded-md p-3 mt-3 bg-transparent"
                      placeholder="Total in USD"
                      type="text"
                      name="total"
                      value={total}
                      required
                      onChange={(e) => setTotal(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* checking element for calculation */}
              <ExpensesForm
                expenses={charges}
                onExpenseSave={handleExpenseSave}
                onTotalCostChange={handleTotalCostChange}
              />
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
                  <th className="sticky top-0 bg-gray-200">Select</th>
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
