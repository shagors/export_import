import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddChargesUpdate = () => {
  const [charges, setCharges] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/addcharges/${id}`, values)
      .then((res) => {
        setCharges(res?.data[0]);
      })
      .catch((error) => setCharges(error));
  }, []);
  console.log(charges);

  const [values, setValues] = useState({
    particularExpencessName: charges?.particularExpencessName,
    particularExpencessCost: charges?.particularExpencessCost,
  });

  console.log(values);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5001/addcharges/${id}`, values)
      .then((res) => {
        toast.success("Successfully Uploaded to server");
        navigate("/addcharges");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-violet-500 text-center mt-5">
        Charges Data Update Form
      </h1>
      <div className="mt-8">
        <Link to="/addcharges" className="">
          <BsArrowLeft className="w-56 lg:w-[380px] h-[35px] text-purple-500" />
        </Link>
        <div className="w-8 h-[2px] bg-green-700 ml-[95px] lg:ml-[175px] animate-pulse"></div>
      </div>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[70%]">
          <div className="mt-6">
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                What Type of Expencess
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-2 bg-transparent"
                placeholder="Enter Expencess Type"
                type="text"
                name="particularExpencessName"
                value={values.particularExpencessName}
                id="particularExpencessName"
                onChange={(e) =>
                  setValues({
                    ...values,
                    particularExpencessName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-lg font-semibold" htmlFor="productName">
                Expencess Cost
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-2 bg-transparent"
                placeholder="Enter Expencess Cost"
                type="number"
                name="particularExpencessCost"
                id="particularExpencessCost"
                onChange={(e) =>
                  setValues({
                    ...values,
                    particularExpencessCost: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mt-5 flex flex-col gap-y-4">
              <button
                className="active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
                type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChargesUpdate;
