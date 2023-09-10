import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

const Finance = () => {
  const [selectedBEDate, setSelectedBEDate] = useState(null);
  const [exim, setExim] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [totalUSD, setTotalUSD] = useState(0);
  const [beNumber, setBENumber] = useState("");
  const [ipNumber, setIPNumber] = useState("");
  const [selectedRemarkDate, setSelectedRemarkDate] = useState(null);
  const [totalNetWeight, setTotalNetWeight] = useState(0);
  const [totalPalletQuantity, setTotalPalletQuantity] = useState(0);
  const [palletRemarks, setPalletRemarks] = useState("Pallet");

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

  const handleRemarkDateChange = (date) => {
    setSelectedRemarkDate(date);
  };

  const handletotalNetWeightChange = (e) => {
    setTotalNetWeight(e.target.value);
  };

  const handleTotalPalletQuantityChange = (e) => {
    setTotalPalletQuantity(e.target.value);
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
      remarkDate: selectedRemarkDate,
      totalNetWeight: parseFloat(totalNetWeight),
      totalPalletQuantity: parseInt(totalPalletQuantity),
      palletRemarks: palletRemarks,
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
            {/*  Particulars */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Particulars
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Particulars"
                type="text"
                required
                name="particulars"
                //   onChange={handleChange}
              />
            </div>
            {/*  Particular Amount */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Prticular Amount
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Particular Amount"
                type="text"
                required
                name="particularAmount"
                //   onChange={handleChange}
              />
            </div>
            {/*  Particular total Amount */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Prticular Total Amount
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Particular total Amount"
                type="text"
                required
                name="particularTotalAmount"
                //   onChange={handleChange}
              />
            </div>
            {/*  Remarks */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Remarks
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Remarks"
                type="text"
                required
                name="particularRemarks"
                //   onChange={handleChange}
              />
            </div>
            {/*  Remarks Date */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Remarks Date
              </label>
              <DatePicker
                selected={selectedRemarkDate}
                onChange={handleRemarkDateChange}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
                required
                className="border rounded-xl w-60 py-[18px] px-3 mt-1 text-gray-700 leading-tight"
              />
            </div>
            {/*  Product Name */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Product Name
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Product Name"
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
                placeholder="Total Net Weight"
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
          <div className="flex justify-center items-center mt-3 mb-5">
            <Link
              to="/exportimport"
              className="btn btn-info font-bold px-8 md:px-[90px] py-[10px] text-purple-950 hover:text-purple-800 mr-4">
              Back
            </Link>
            <button
              className="btn btn-info font-bold px-8 md:px-[90px] py-[10px] text-purple-950 hover:text-purple-800 ml-4"
              type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Finance;
