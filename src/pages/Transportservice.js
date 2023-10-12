import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { toast } from "react-toastify";
import { addDays, format } from "date-fns";

const Transportservice = () => {
  const [products, setProducts] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [productBoxes, setProductBoxes] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const refOne = useRef(null);

  useEffect(() => {
    // https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts
    axios
      .get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts"
      )
      .then((res) => {
        setAllProducts(res?.data);
        setProducts(res?.data);
      })
      .catch((error) =>
        toast.error("Something wrong Please try again later!!")
      );
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);

    fetchProductInBoxes();
    fetchExpenses();
  }, []);

  const fetchProductInBoxes = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/product_in_boxes"
      );
      setProductBoxes(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/purchase"
      );
      setExpenses(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (date) => {
    const filtered = allProducts.filter((product) => {
      const productDate = new Date(product.date);
      return (
        productDate >= date.selection.startDate &&
        productDate <= date.selection.endDate
      );
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setProducts(filtered);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  useEffect(() => {
    const jsonString =
      '[{"id":79,"productName":"Dot Matrix","productModel":"[\\"AK890\\",\\"TH880\\"]","quantity":2600,"splitProductsBox":"[\\"2\\",\\"2\\"]","splitQuantitySingleProduct":"[\\"1300\\",\\"1300\\"]","productPerBox":"4","totalBox":650,"totalPallet":"shaking001","truckNumber":"Exp001"},{"id":80,"productName":"Dot Matrix","productModel":"[\\"AK890\\",\\"TH880\\"]","quantity":2800,"splitProductsBox":"[\\"2\\",\\"2\\"]","splitQuantitySingleProduct":"[\\"1400\\",\\"1400\\"]","productPerBox":"4","totalBox":700,"totalPallet":"shaking001","truckNumber":"Exp001"},{"id":81,"productName":"Thermal Printer","productModel":"[\\"TP210A\\",\\"TP210B\\"]","quantity":4600,"splitProductsBox":"[\\"2\\",\\"2\\"]","splitQuantitySingleProduct":"[\\"2300\\",\\"2300\\"]","productPerBox":"4","totalBox":1150,"totalPallet":"shaking001","truckNumber":"Exp001"}]';

    // const jsonString = productBoxes;
    const parsedData = JSON.parse(jsonString);

    // Parse the stringified arrays back to actual arrays
    const updatedData = parsedData.map((item) => ({
      ...item,
      productModel: JSON.parse(item.productModel),
      splitProductsBox: JSON.parse(item.splitProductsBox),
      splitQuantitySingleProduct: JSON.parse(item.splitQuantitySingleProduct),
    }));

    setData(updatedData);
  }, []);

  // test calculations for future dashboard
  const stringNumbers = expenses.map((ex) => ex.total);
  const sum = stringNumbers.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue);
  }, 0);

  return (
    <>
      <div>
        <p>Sum of numbers: {sum}</p>
      </div>
      {/* date and date by search filter table query */}
      {/* <div className="overflow-x-auto h-[700px] mb-5">
        <div className="text-center my-4 calendarWrap">
          <input
            value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(
              range[0].endDate,
              "MM/dd/yyyy"
            )}`}
            readOnly
            className="inputBox border-2 border-indigo-600 p-2 w-[225px] rounded"
            onClick={() => setOpen((open) => !open)}
          />
          <div ref={refOne}>
            {open && (
              <DateRangePicker
                className="flex justify-center calendarElement"
                onChange={handleSelect}
                // onChange={(item) => setRange([item.selection])}
                editableDateInputs={true}
                ranges={[selectionRange]}
                months={2}
                direction="horizontal"
                staticRanges={[]}
                inputRanges={[]}
              />
            )}
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Model</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              const date = new Date(product.date);
              return (
                <tr key={product.id}>
                  <th>{product.id}</th>
                  <td>{product.productName}</td>
                  <td>{product.productModel}</td>
                  <td>{date.toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}

      {/* products boxes table check and data get from server */}
      <h1 className="text-2xl text-center my-3 font-bold underline">
        Products checks Box
      </h1>
      <div className="overflow-x-auto h-[700px] mb-5">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Product Model</th>
              <th>Quantity</th>
              <th>Product/Box</th>
              <th>Split product</th>
              <th>Split Quantity</th>
              <th>Total Box</th>
              <th>Pallent</th>
              <th>Truck NO.</th>
            </tr>
          </thead>
          <tbody>
            {productBoxes?.map((product) => {
              return (
                <tr key={product.id}>
                  <th>{product.id}</th>
                  <td>{product.productName}</td>
                  <td>{product.productModel}</td>
                  {/* <td>{product.productModel.join(", ")}</td> */}
                  <td>{product.quantity}</td>
                  <td>{product.productPerBox}</td>
                  <td>{product.totalBox}</td>
                  <td>{product.splitProductsBox}</td>
                  {/* <td>{product.splitProductsBox.join(", ")}</td> */}
                  <td>{product.splitQuantitySingleProduct}</td>
                  <td>{product.totalPallet}</td>
                  <td>{product.truckNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* products boxes table check and data get from server */}
      <h1 className="text-2xl text-center my-3 font-bold underline">
        Expenses
      </h1>
      <div className="overflow-x-auto h-[700px] mb-5">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>invoiceNo</th>
              <th>ipNo</th>
              <th>officeAccount</th>
              <th>particularExpenseNames</th>
              <th>transportCountryName</th>
              <th>transportWay</th>
              <th>total</th>
              <th>totalCost</th>
              <th>truckNo.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((expense) => {
              return (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{expense.invoiceNo}</td>
                  <td>{expense.ipNo}</td>
                  <td>{expense.officeAccount}</td>
                  <td>
                    <ul>
                      {expense.particularExpenseNames.map((ex) => (
                        <li key={ex.expenseId}>
                          {ex.particularExpenseName}:{ex.particularExpenseCost}{" "}
                          -{ex.remark} - {ex.date}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{expense.transportCountryName}</td>
                  <td>{expense.transportWay}</td>
                  <td>{expense.total}</td>
                  <td>{expense.totalCost}</td>
                  <td>{expense.truckNo}</td>
                  <td>Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transportservice;
