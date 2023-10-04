import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import axios from "axios";

const Finance = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedBEDate, setSelectedBEDate] = useState(null);
  const [exim, setExim] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [totalUSD, setTotalUSD] = useState(0);
  const [beNumber, setBENumber] = useState("");
  const [ipNumber, setIPNumber] = useState("");
  const [totalNetWeight, setTotalNetWeight] = useState(0);
  const [totalPalletQuantity, setTotalPalletQuantity] = useState(0);
  const [truckNo, setTruckNo] = useState(0);
  const [palletRemarks, setPalletRemarks] = useState("Pallet");

  // Data fetch from server
  useEffect(() => {
    //   getting expenses data from office_accounts server
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/purchase"
      );
      setExpenses(response?.data);
    } catch (error) {
      toast.error("Error from server to get data!!");
    }
  };

  const handleBEDateChange = (date) => {
    setSelectedBEDate(date);
  };

  const handleEXIMChange = (e) => {
    setExim(e.target.value);
  };

  const handleInvoiceNoChange = (e) => {
    setInvoiceNo(e.target.value);
  };

  const handleTotalUSDChange = (e) => {
    setTotalUSD(e.target.value);
  };

  const handleBENumberChange = (e) => {
    setBENumber(e.target.value);
  };

  const handleIPNumberChange = (e) => {
    setIPNumber(e.target.value);
  };

  const handletotalNetWeightChange = (e) => {
    setTotalNetWeight(e.target.value);
  };

  const handleTotalPalletQuantityChange = (e) => {
    setTotalPalletQuantity(e.target.value);
  };

  const handleTruckNo = (e) => {
    setTruckNo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      beDate: selectedBEDate,
      exim: exim,
      invoiceNo: invoiceNo,
      totalUSD: parseFloat(totalUSD),
      beNumber: beNumber,
      ipNumber: ipNumber,
      totalNetWeight: parseFloat(totalNetWeight),
      totalPalletQuantity: parseInt(totalPalletQuantity),
      palletRemarks: palletRemarks,
      truckNo: truckNo,
    };
    toast.success("Data successfully Saved!!", { position: "top-center" });
    console.log(data);
  };
  return (
    <div>
      <h1 className="flex justify-center items-center text-4xl my-4 uppercase text-info font-bold">
        Finance
      </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-6 mx-4">
            {/*B/E Date  */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                B/E Date
              </label>
              <DatePicker
                selected={selectedBEDate}
                onChange={handleBEDateChange}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
                className="border rounded-xl w-60 py-[18px] px-3 mt-1 text-gray-700 leading-tight"
                required
              />
            </div>
            {/*  Export/Import*/}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Export/Import
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Export/Import"
                type="text"
                required
                name="exim"
                onChange={handleEXIMChange}
              />
            </div>
            {/*  Invoice No */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Invoice Number
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Invoice Number"
                type="text"
                required
                name="invoiceNo"
                onChange={handleInvoiceNoChange}
              />
            </div>
            {/*  Total USD */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Total In USD
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Total USD Payment"
                type="text"
                required
                name="totalUSD"
                onChange={handleTotalUSDChange}
              />
            </div>
            {/*  B/E Number */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                B/E Number
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter B/E Number"
                type="text"
                required
                name="beNumber"
                onChange={handleBENumberChange}
              />
            </div>
            {/*  IP Number */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                IP Number
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter IP Number"
                type="text"
                required
                name="ipNumber"
                onChange={handleIPNumberChange}
              />
            </div>

            {/*  Product Name */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Product Name
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Product Name come API"
                type="text"
                required
                name="productsName"
                //   onChange={handleChange}
              />
            </div>
            {/*  Total Net Weight */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Net Weight
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Total Weight come API"
                type="text"
                required
                name="totalNetWeight"
                onChange={handletotalNetWeightChange}
              />
            </div>
            {/*  Pallet Quantity */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Pallet Quantity
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Total Pallet Quantity"
                type="number"
                required
                min={0}
                name="totalPalletQuantity"
                onChange={handleTotalPalletQuantityChange}
              />
            </div>
            {/*  Truck No */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Truck No
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                type="text"
                required
                name="truckNo"
                onChange={handleTruckNo}
              />
            </div>
            {/*  Remarks for Pallet */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Pallet Remarks
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Pallet Remarks"
                type="text"
                required
                name="palletRemarks"
                value="Pallet"
                onChange={(e) => setPalletRemarks(e.target.value)}
              />
            </div>
          </div>
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
                  {/* <th>Select</th> */}
                  <th>ID</th>
                  <th>Invoice No</th>
                  <th>IP No</th>
                  <th>Total (USD)</th>
                  <th>Expenses (TK)</th>
                  <th>Products Name</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {expenses?.map((expense) => (
                  <tr className={`hover cursor-pointer`} key={expense.id}>
                    {/* <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        name="product"
                        value={product.id}
                        onClick={() => handleProductCheck(product)}
                      />
                    </td> */}
                    <td>{expense.id}</td>
                    <td>{expense.invoiceNo}</td>
                    <td>{expense.ipNo}</td>
                    <td>{expense.total}</td>
                    <td>{expense.totalCost}</td>
                    <td>{expense.officeAccount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
