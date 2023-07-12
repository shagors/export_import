import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Accounts = ({ brand, model }) => {
  const [startDate, setStartDate] = useState(new Date());

  const [formData, setFormData] = useState({
    typeOfProduct: "",
    productName: "",
    date: startDate,
    productBrand: brand,
    modelNo: model,
    productQuantity: "",
  });

  const navigate = useNavigate();

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
    navigate("/transport");
  };

  // console.log(formData);
  return (
    <>
      <div>
        <div className="">
          <h1 className="flex justify-center items-center text-4xl my-4 uppercase text-info font-bold">
            Add Accounts Data :
          </h1>
          <div className="mt-5 lg:flex justify-center items-center">
            <form
              className="card lg:w-[700px] bg-base-100 shadow-xl mt-5"
              onSubmit={formSubmit}>
              <div className="form-control mt-5">
                <div className="input-group  flex lg:flex-none justify-center items-center">
                  <select
                    className="select select-info w-full max-w-xs"
                    id="selectOption"
                    value={formData.typeOfProduct}
                    name="typeOfProduct"
                    onChange={handleChange}>
                    <option defaultValue="Export" value="export">
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
                      className="select select-info w-full max-w-xs"
                      id="selectOption"
                      value={formData.productName}
                      name="productName"
                      onChange={handleChange}>
                      <option disabled defaultValue="Pick the propduct">
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
                    className="border-2 select-info rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col  justify-between items-center px-8 mt-4 lg:mt-0 w-full">
                <div className="join mb-4">
                  <div className="form-control">
                    <div className="input-group  flex lg:flex-none justify-center items-center gap-5">
                      <Link to="/brandpick" className="btn btn-info">
                        Pick the Brand
                      </Link>
                      {<p>Your Selected Brand is: {brand}</p>}
                    </div>
                  </div>
                </div>
                <div className="join mb-4">
                  <div className="form-control">
                    <div className="input-group  flex lg:flex-none justify-center items-center gap-5">
                      <Link to="/modelpick" className="btn btn-info">
                        Pick the Model
                      </Link>
                      {<p>Your Selected Model is: {model}</p>}
                    </div>
                  </div>
                </div>
                <div className="join mb-4">
                  <input
                    className="input input-bordered rounded-md join-item select-info"
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
