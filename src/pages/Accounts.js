import React from "react";
import ReactDatePicker from "react-datepicker";

const Accounts = () => {
  return (
    <>
      <div>
        <div className="">
          <h1 className="flex justify-center items-center text-3xl my-4 uppercase text-violet-500 font-medium ">
            Add Accounts Data :
          </h1>
          <div className="mt-5 flex justify-center items-center">
            <form className="card w-[600px] bg-base-100 shadow-xl ">
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
                <div></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
