import axios from "axios";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";

const Transportservice = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    axios
      .get("https://64d88afe5f9bf5b879ce54e8.mockapi.io/products")
      .then((res) => {
        setAllProducts(res?.data);
        setProducts(res?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSelect = (date) => {
    const filtered = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt);
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
      <div className="overflow-x-auto">
        <DateRangePicker
          onChange={handleSelect}
          editableDateInputs={true}
          ranges={[selectionRange]}
        />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              const date = new Date(product.createdAt);
              return (
                <tr key={product.id}>
                  <th>{product.id}</th>
                  <td>{product.name}</td>
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
