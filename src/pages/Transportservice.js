import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { toast } from "react-toastify";
import { addDays, format } from "date-fns";

const Transportservice = () => {
  const [products, setProducts] = useState([]);
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
  const refOne = useRef(null);

  useEffect(() => {
    // https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/office_accounts
    // https://64d88afe5f9bf5b879ce54e8.mockapi.io/products
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
  }, []);

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

  return (
    <>
      <div className="overflow-x-auto h-[700px]">
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
      </div>
    </>
  );
};

export default Transportservice;
