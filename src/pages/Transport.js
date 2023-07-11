import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Transport = () => {
  const [formData, setFormData] = useState({
    transportWay: "",
    transportCost: "",
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
    navigate("/export");
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <div>
          <h1 className="flex justify-center items-center text-4xl my-4 uppercase text-info font-bold">
            Product Transportation :
          </h1>
          <div>
            <form
              className="card lg:w-[600px] h-[300px] bg-base-100 shadow-xl mt-5"
              onSubmit={formSubmit}>
              <div className="form-control my-5">
                <div className="input-group  flex lg:flex-none justify-center items-center">
                  <select
                    className="select select-info w-full max-w-xs"
                    id="selectOption"
                    value={formData.transportWay}
                    name="transportWay"
                    onChange={handleChange}>
                    <option selected value="road">
                      By Road
                    </option>
                    <option value="air">By Air</option>
                    <option value="ship">By Ship</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <select
                  className="select select-info w-full max-w-xs"
                  id="selectOption"
                  value={formData.transportCost}
                  name="transportCost"
                  onChange={handleChange}>
                  <option selected value="3500">
                    $3500
                  </option>
                  <option value="7000">$7000</option>
                  <option value="1800">$1800</option>
                </select>
              </div>
              <div className="flex justify-end items-center mr-7 py-5 gap-4">
                <Link
                  to="/accounts"
                  className="btn btn-info font-bold px-8 py-1 text-slate-700">
                  Back
                </Link>
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

      {/* <div className="bg-slate-200 mt-6">
        <h3 className="text-center text-info font-semibold text-3xl py-5">
          How Many Days Your Products Arrvied?
        </h3>
        <form>
          <div className="flex justify-center items-center mt-6">
            <div>
              <select className="select select-info w-full max-w-xs">
                <option disabled selected>
                  Select Exporter
                </option>
                <option>Bangladesh</option>
              </select>
            </div>
            <p className="mx-5">to</p>
            <div>
              <select className="select select-info w-full max-w-xs">
                <option disabled selected>
                  Select Your Country
                </option>
                <option>China</option>
                <option>Singapor</option>
                <option>Vietnam</option>
                <option>Thiland</option>
                <option>Philipines</option>
                <option>Malaysia</option>
                <option>Thiland</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center py-4">
            <button className="btn btn-info btn-sm">Calculate Time</button>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default Transport;