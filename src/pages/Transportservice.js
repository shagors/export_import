import axios from "axios";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { toast } from "react-toastify";
import DateRange from "./DateRange";
import DateRangePickerComp from "./DateRangePickerComp";

const Transportservice = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/office_accounts
    // https://64d88afe5f9bf5b879ce54e8.mockapi.io/products
    axios
      .get(
        "http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/office_accounts"
      )
      .then((res) => {
        setAllProducts(res?.data);
        setProducts(res?.data);
      })
      .catch((error) =>
        toast.error("Something wrong Please try again later!!")
      );
  }, []);

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
      <DateRange />
      <DateRangePickerComp />
      <div className="overflow-x-auto">
        <DateRangePicker
          className="flex justify-center"
          onChange={handleSelect}
          editableDateInputs={true}
          ranges={[selectionRange]}
          staticRanges={[]}
          inputRanges={[]}
        />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
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
