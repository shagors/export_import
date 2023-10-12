import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect, CSSProperties } from "react";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";

// loader css style
const override: CSSProperties = {
  display: "block",
  margin: "25px auto",
};

const FinalData = () => {
  const [expenses, setExpenses] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [finances, setFinances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    fetchExpenses();
    fetchAccounts();
    fetchFinance();
  }, []);

  // for pagination function
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Data fetch from purchase API
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/purchase"
      );
      // data see in table descending order
      const sortedData = response?.data.sort((a, b) => b.id - a.id);
      // const data = JSON.parse(sortedData);
      setExpenses(sortedData);
    } catch (error) {
      toast.error("Error from server to get data!!");
    }
  };

  // Data fetch from office_accounts API
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

  // Data fetch from finance API
  const fetchFinance = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/finance"
      );
      const sortedData = response?.data.sort(
        (a, b) => b.financeId - a.financeId
      );
      setFinances(sortedData);
      setLoading(false);
    } catch (error) {
      toast.error("Error from server to get data!!");
    }
  };

  // pagination calculation
  const offset = currentPage * itemsPerPage;
  const currentData = finances.slice(offset, offset + itemsPerPage);

  //   console.log(finances);

  return (
    <>
      <div className="mb-3">
        <h1 className="text-center my-6 text-3xl text-info font-bold bg-slate-500 p-3 rounded-lg uppercase">
          Export Products Details
        </h1>
        <div className="overflow-x-auto mx-2 mb-3">
          {loading ? (
            <div className="">
              <ClipLoader
                color={"#36d7b7"}
                loading={loading}
                size={50}
                cssOverride={override}
              />
              <p className="text-center font-extralight text-xl text-green-400">
                Please wait ....
              </p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th className="sticky top-0 bg-gray-200">ID</th>
                  <th className="sticky top-0 bg-gray-200">BE Date</th>
                  <th className="sticky top-0 bg-gray-200">Export/Import</th>
                  <th className="sticky top-0 bg-gray-200">Invoice No</th>
                  <th className="sticky top-0 bg-gray-200">
                    Total <span className="text-red-600">(USD)</span>
                  </th>
                  <th className="sticky top-0 bg-gray-200">B/E No</th>
                  <th className="sticky top-0 bg-gray-200">IP No</th>
                  <th className="sticky top-0 bg-gray-200">Expenses List</th>
                  <th className="sticky top-0 bg-gray-200">
                    Total Expenses <span className="text-blue-600">(TK)</span>
                  </th>
                  <th className="sticky top-0 bg-gray-200">Products Name</th>

                  <th className="sticky top-0 bg-gray-200">Net Weight</th>
                  <th className="sticky top-0 bg-gray-200">Pallet Quantity</th>
                  <th className="sticky top-0 bg-gray-200">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {currentData?.map((finance) => {
                  const officeID = finance?.officeAccount;
                  // console.log(officeID);
                  const matchedProducts = accounts?.filter((account) =>
                    officeID?.includes(account.id)
                  );
                  // console.log(matchedProducts);
                  //   convert date string
                  const dateString = finance.selectedBEDate;
                  const dateObj = new Date(dateString);
                  const localDate = dateObj.toLocaleDateString();
                  return (
                    <tr
                      className={`hover cursor-pointer text-[13px]`}
                      key={finance.financeId}>
                      <td>{finance.financeId}</td>
                      <td>{localDate}</td>
                      <td>{finance.exim}</td>
                      <td>{finance.invoiceNo}</td>
                      <td>{finance.total}</td>
                      <td>{finance.beNumber}</td>
                      <td>{finance.ipNo}</td>
                      <td>
                        <ul>
                          {finance.particularExpenseNames.map((ex) => (
                            <li key={ex.expenseId}>
                              {ex.particularExpenseName}:
                              {ex.particularExpenseCost}:{ex.date}:{ex.remark}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>{finance.totalCost}</td>
                      <td>
                        {matchedProducts
                          ?.map((p) => {
                            return p.productName;
                          })
                          .join(",")}
                      </td>
                      <td>{finance.totalNetWeight}</td>
                      <td>{finance.totalPalletQuantity}</td>
                      <td>{finance.palletRemarks}</td>
                      {/* <td>
                        <button onClick={() => handleDelete(expense?.id)}>
                          <AiOutlineDelete className="w-6 h-6 text-red-600" />
                        </button>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {/* for pagination code */}
        <ReactPaginate
          previousLabel={"< Previous"}
          nextLabel={"Next >"}
          breakLabel={"..."}
          pageCount={Math.ceil(finances.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"pagination flex gap-2 justify-center mt-4"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link text-gray-800 px-2 py-2"}
          activeClassName={"active bg-sky-300 rounded-md"}
          className="flex items-center justify-center py-[4px]"
        />
      </div>
    </>
  );
};

export default FinalData;
