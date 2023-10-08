import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";

const Finance = () => {
  const [expenses, setExpenses] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedBEDate, setSelectedBEDate] = useState(null);
  const [formData, setFormData] = useState({});
  const [exim, setExim] = useState("");
  const [beNumber, setBENumber] = useState("");
  const [totalNetWeight, setTotalNetWeight] = useState(0);
  const [totalPalletQuantity, setTotalPalletQuantity] = useState(0);
  const [palletRemarks, setPalletRemarks] = useState("Pallet");
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    //   getting expenses data from office_accounts server
    fetchExpenses();
    fetchAccounts();
  }, []);

  // Data fetch from server
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

  // Data fetch from server
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

  const handleEXIMChange = (e) => {
    setExim(e.target.value);
  };

  const handleBENumberChange = (e) => {
    setBENumber(e.target.value);
  };

  const handletotalNetWeightChange = (e) => {
    setTotalNetWeight(e.target.value);
  };

  const handleTotalPalletQuantityChange = (e) => {
    setTotalPalletQuantity(e.target.value);
  };

  const handleRowClick = (rowData) => {
    setFormData(rowData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // // map and extract from array
  // const matchedIds = expenses?.map((ex) => ex.officeAccount);

  // // array stringify for filtered
  // const formattedIds = matchedIds.map((idString) => JSON.parse(idString));

  // // match the seleted id with accounts and filter out seleted products name
  // const matchedProducts = accounts.filter((account) =>
  //   formattedIds.some((item) => item.includes(account.id))
  // );

  // merge data old and new data set to formData
  const handleAddNewData = () => {
    const data = {
      selectedBEDate: selectedBEDate,
      exim: exim,
      beNumber: beNumber,
      totalNetWeight: totalNetWeight,
      totalPalletQuantity: totalPalletQuantity,
      palletRemarks: palletRemarks,
    };

    setFormData((prevData) => ({
      ...prevData, // Retain previous data
      ...data, // Add new fields
    }));
  };

  // data save and send to server
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to your API for saving

    toast.success("Data successfully Saved!!", { position: "top-center" });
    console.log(formData);
    navigate("/exportimport");
  };

  // product delete from server and also frontend
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/purchase/${id}`
      );
      toast.warn("Data successfully Deleted!!", { position: "top-center" });
      fetchExpenses();
    } catch (error) {
      toast.error("You can't delete now. Please try again later!", {
        position: "top-center",
      });
    }
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
              <input
                type="date"
                onChange={(e) => setSelectedBEDate(e.target.value)}
                className="border rounded-xl w-60 p-[13px] lg:p-[13px] mt-1 text-gray-700 leading-tight"
                required
              />
            </div>
            {/*  Export/Import*/}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Export/Import
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
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
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Invoice Number"
                type="text"
                readOnly
                name="invoiceNo"
                value={formData.invoiceNo}
                onChange={handleInputChange}
              />
            </div>
            {/*  Total USD */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Total In USD
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Total USD Payment"
                type="text"
                name="total"
                readOnly
                value={formData.total}
                onChange={handleInputChange}
              />
            </div>
            {/*  B/E Number */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                B/E Number
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
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
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Enter IP Number"
                type="text"
                readOnly
                name="ipNo"
                value={formData.ipNo}
                onChange={handleInputChange}
              />
            </div>
            {/*  Particular Expenses cost */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Particular Expenses cost
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Product Name come API"
                type="text"
                readOnly
                name="totalCost"
                value={formData.totalCost}
                onChange={handleInputChange}
              />
            </div>
            {/*  Product Name */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Product Name
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Product Name come API"
                type="text"
                required
                readOnly
                name="officeAccount"
                value={formData.officeAccount}
                onChange={handleInputChange}
              />
            </div>
            {/*  Total Net Weight */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Net Weight
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Enter Total Weight"
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
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Enter Total Pallet Quantity"
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
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                type="text"
                readOnly
                name="truckNo"
                value={formData.truckNo}
                onChange={handleInputChange}
              />
            </div>
            {/*  Remarks for Pallet */}
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Pallet Remarks
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
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
            <p
              className="btn btn-info px-10 active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-lg bg-violet-500 text-white font-bold hover:text-black mb-6 mr-5"
              onClick={handleAddNewData}>
              Merge Data
            </p>
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
            Purchase Data
          </h1>
          <div className="overflow-x-auto add__scrollbar">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Invoice No</th>
                  <th>IP No</th>
                  <th>Total (USD)</th>
                  <th>Expenses (TK)</th>
                  <th>Products Name</th>
                  <th>Expenses List</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses?.map((expense) => {
                  const officeID = expense.officeAccount;
                  // console.log(officeID);
                  const matchedProducts = accounts.filter((account) =>
                    officeID.includes(account.id)
                  );
                  // console.log(matchedProducts);

                  return (
                    <tr
                      className={`hover cursor-pointer`}
                      key={expense.id}
                      onClick={() => handleRowClick(expense)}>
                      <td>{expense.id}</td>
                      <td>{expense.invoiceNo}</td>
                      <td>{expense.ipNo}</td>
                      <td>{expense.total}</td>
                      <td>{expense.totalCost}</td>
                      <td>
                        {matchedProducts
                          ?.map((p) => {
                            return p.productName;
                          })
                          .join(",")}
                      </td>
                      <td>
                        <ul>
                          {expense.particularExpenseNames.map((ex) => (
                            <li key={ex.expenseId}>
                              {ex.particularExpenseName}:
                              {ex.particularExpenseCost}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(expense?.id)}>
                          <AiOutlineDelete className="w-6 h-6 text-red-600" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
