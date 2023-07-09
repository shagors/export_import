import React, { useState } from "react";
import DatePicker from "react-datepicker";

const Accounts = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
  };

  console.log(selectedOption);
  return (
    <>
      <div>
        <div className="">
          <h1 className="flex justify-center items-center text-3xl my-4 uppercase text-violet-500 font-medium ">
            Add Accounts Data :
          </h1>
          <div className="mt-5 lg:flex justify-center items-center">
            <form
              className="card lg:w-[700px] bg-base-100 shadow-xl"
              onSubmit={formSubmit}>
              <div className="lg:flex justify-between items-center">
                <div className="form-control card-body">
                  <div className="input-group  flex lg:flex-none justify-center items-center">
                    <select
                      className="select select-bordered"
                      id="selectOption"
                      value={selectedOption}
                      onChange={handleSelectChange}>
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
                  />
                </div>
              </div>
              <div className="flex-col flex justify-between items-center px-8 mt-4 lg:mt-0">
                <div className="join mb-4">
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
                <div className="join">
                  <input
                    className="input input-bordered join-item"
                    placeholder="Quantity"
                    type="number"
                  />
                  <p className="btn join-item rounded-r-full">Pcs</p>
                </div>
              </div>
              <div className="flex justify-end items-center mr-7 py-5">
                <button className="btn btn-secondary btn-sm" type="submit">
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
