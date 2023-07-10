import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

const Accounts = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [formData, setFormData] = useState({
    typeOfProduct: "",
    productName: "",
    date: startDate,
    productBrand: "",
    modelNo: "",
    productQuantity: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    toast.success("File added");
    console.log(formData);
  };

  // console.log(formData);
  return (
    <>
      <div>
        <div className="">
          <h1 className="flex justify-center items-center text-3xl my-4 uppercase text-info font-medium ">
            Add Accounts Data :
          </h1>
          <div className="mt-5 lg:flex justify-center items-center">
            <form
              className="card lg:w-[700px] bg-base-100 shadow-xl mt-5"
              onSubmit={formSubmit}>
              <div className="form-control mt-5">
                <div className="input-group  flex lg:flex-none justify-center items-center">
                  <select
                    className="select select-info select-bordered"
                    id="selectOption"
                    value={formData.typeOfProduct}
                    name="typeOfProduct"
                    onChange={handleChange}>
                    <option selected value="export">
                      Export
                    </option>
                    <option value="import">Import</option>
                  </select>
                </div>
              </div>
              <div className="lg:flex justify-between items-center">
                <div className="form-control card-body">
                  <div className="input-group  flex lg:flex-none justify-center items-center">
                    <select
                      className="select select-info select-bordered"
                      id="selectOption"
                      value={formData.productName}
                      name="productName"
                      onChange={handleChange}>
                      <option disabled selected>
                        Pick the propduct
                      </option>
                      <option value="attendance">Attendance check-check</option>
                      <option value="thermal">Thermal printer</option>
                      <option value="dot">Dot printer</option>
                    </select>
                  </div>
                </div>
                <div className="lg:pr-2 text-center flex justify-center items-center">
                  <p className="pr-2">Date : </p>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    name="date"
                    value={formData.date}
                    className="border-2 select-info"
                  />
                </div>
              </div>
              <div className="flex-col flex justify-between items-center px-8 mt-4 lg:mt-0">
                <div className="join mb-4">
                  <div>
                    <div className="">
                      <input
                        className="input input-bordered join-item select-info"
                        placeholder="Product Brand Name"
                        type="text"
                        name="productBrand"
                        value={formData.productBrand}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="join mb-4">
                  <div>
                    <div>
                      <input
                        className="input input-bordered join-item select-info"
                        placeholder="Product Model No"
                        type="text"
                        name="modelNo"
                        value={formData.modelNo}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="join">
                  <input
                    className="input input-bordered join-item select-info"
                    placeholder="Quantity"
                    type="number"
                    name="productQuantity"
                    value={formData.productQuantity}
                    onChange={handleChange}
                  />
                  <p className="btn join-item rounded-r-full">Pcs</p>
                </div>
              </div>
              <div className="flex justify-end items-center mr-7 py-5">
                <button
                  className="btn btn-info font-bold px-8 py-1 text-slate-700"
                  type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
