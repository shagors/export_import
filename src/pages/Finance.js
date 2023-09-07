import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Finance = () => {
  return (
    <div>
      <h1 className="flex justify-center items-center text-4xl my-4 uppercase text-info font-bold">
        Finance
      </h1>
      <div className="mt-6">
        <Link to="/exportimport" className="">
          <BsArrowLeft className="w-40 lg:w-[380px] h-[35px] text-purple-500" />
          <div className="w-8 h-[2px] bg-green-700 ml-[65px] lg:ml-[175px] animate-pulse"></div>
        </Link>
      </div>
      <div>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-6 mx-4">
            {/*B/E Date  */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                B/E Date
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Product Name"
                type="date"
                name="beDate"
                //   onChange={handleChange}
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
                name="exim"
                //   onChange={handleChange}
                required
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
                name="invoiceNo"
                //   onChange={handleChange}
                required
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
                name="totalUSD"
                //   onChange={handleChange}
                required
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
                name="beNumber"
                //   onChange={handleChange}
                required
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
                name="ipNumber"
                //   onChange={handleChange}
                required
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
                name="particulars"
                //   onChange={handleChange}
                required
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
                name="particularAmount"
                //   onChange={handleChange}
                required
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
                name="particularTotalAmount"
                //   onChange={handleChange}
                required
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
                name="particularRemarks"
                //   onChange={handleChange}
                required
              />
            </div>
            {/*  Remarks Date */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Remarks Date
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Remarks Date"
                type="date"
                name="remarksDate"
                //   onChange={handleChange}
                required
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
                name="productName"
                //   onChange={handleChange}
                required
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
                name="totalNetWeight"
                //   onChange={handleChange}
                required
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
                min={0}
                name="totalPalletQuantity"
                //   onChange={handleChange}
                required
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
                name="palletRemarks"
                //   onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-center items-center mt-3 mb-5">
            <button
              className="btn btn-info font-bold px-8 md:px-[90px] py-[10px] text-purple-950 hover:text-purple-800"
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
