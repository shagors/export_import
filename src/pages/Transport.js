import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Transport = () => {
  const [formData, setFormData] = useState({
    transportWay: "",
    transportCost: "",
  });
  const [localData, setLocalData] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const storeData = localStorage?.getItem("formTransportData");
    if (storeData) {
      setLocalData(JSON.parse(storeData));
    }
  }, []);

  if (!localData) {
    return toast.error("Data is empty");
  }

  const formSubmit = (e) => {
    e.preventDefault();
    toast.success("File added");
    console.log(formData);
    navigate("/export");
  };

  console.log(localData);
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
                  <div className="form-control card-body">
                    <label className="text-center mb-3">
                      <span className="lebel-text text-lg font-semibold bg-white">
                        Pick Transport Way
                      </span>
                    </label>
                    <div className="input-group  flex lg:flex-none justify-center items-center">
                      <select
                        className="select select-info w-full max-w-xs"
                        id="selectOption"
                        value={formData.transportWay}
                        name="productName"
                        onChange={handleChange}>
                        <option selected>Pick Tranport Way</option>
                        {localData?.map((product, index) => (
                          <option key={index}>{product.transportWay}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="bg-white font-bold text-lg">
                      Transport Cost ?
                    </span>
                  </label>
                  <input
                    type="text"
                    name="transportCost"
                    placeholder="Type here Transport Cost"
                    className="input input-bordered w-full max-w-xs input-info"
                    onChange={handleChange}
                    required
                  />
                </div>
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
    </div>
  );
};

export default Transport;
