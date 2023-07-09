import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

const Accounts = () => {
  const date = new Date().toLocaleDateString();
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div>
        <div className="">
          <h1 className="flex justify-center items-center text-3xl my-4 uppercase text-violet-500 font-medium ">
            Add Accounts Data :
          </h1>
          <div className="mt-5 lg:flex justify-center items-center">
            <form className="card lg:w-[700px] bg-base-100 shadow-xl">
              <div className="lg:flex justify-between items-center">
                <div className="form-control card-body">
                  <div className="input-group">
                    <select className="select select-bordered">
                      <option disabled selected>
                        Pick the propduct
                      </option>
                      <option>Attendance check-check</option>
                      <option>Thermal printer</option>
                      <option>Dot printer</option>
                    </select>
                  </div>
                </div>
                <div className="lg:pr-2 text-center flex justify-center items-center">
                  <p className="pr-2">Date : </p>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="lg:flex justify-between items-center px-8 mt-4 lg:mt-0">
                <div className="join">
                  <input
                    className="input input-bordered join-item"
                    placeholder="Quantity"
                    type="number"
                  />
                  <p className="btn join-item rounded-r-full">Pcs</p>
                </div>
                <div className="join mt-4 lg:mt-0">
                  <div>
                    <div>
                      <input
                        className="input input-bordered join-item"
                        placeholder="Product Model Name"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Link to="" className="flex justify-end items-center mr-7 py-5">
                <button className="btn btn-secondary btn-sm">Save</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
