import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCharges = () => {
  const [charges, setCharges] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    particularExpencessName: "",
    particularExpencessCost: 0,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/addcharges", formData)
      .then((res) => {
        toast.success("Successfully Uploaded to server");
      })
      .catch((err) => toast.error(err));
    setFormData({
      particularExpencessName: "",
      particularExpencessCost: "",
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/addcharges")
      .then((res) => setCharges(res?.data))
      .catch((error) => setCharges(error));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-violet-500 text-center mt-5">
        All Charges Entry Form
      </h1>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[70%]">
          <div className="mt-8">
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                What Type of Expencess
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-2 bg-transparent"
                placeholder="Enter Expencess Type"
                type="text"
                name="particularExpencessName"
                id="particularExpencessName"
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-5 flex flex-col gap-y-4">
              <button
                className="active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
                type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Table data get from accouts input database */}
      <div>
        <h1 className="text-center my-6 text-3xl text-info font-bold bg-slate-500 p-3 rounded-lg uppercase">
          All Stored Expencess's Details
        </h1>
        <div className="overflow-x-auto add__scrollbar">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Expencess Name</th>
                <th>Expencess Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {charges?.map((charge) => (
                <tr className="hover cursor-pointer" key={charge.id}>
                  <td>{charge.id}</td>
                  <td>{charge.particularExpencessName}</td>
                  <td>{charge.particularExpencessCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddCharges;
