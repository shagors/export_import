/* eslint-disable no-restricted-globals */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";

const AddCharges = () => {
  const [charges, setCharges] = useState([]);

  const [formData, setFormData] = useState({
    // particularExpencessName: "",
    // particularExpencessCost: "",
    particularExpenseName: "",
    particularExpenseCost: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Data save for server
  //  http://localhost:5001/addcharges

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://43.154.22.219:3091/api/dev/addcharges", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("Data Successfully Uploaded to server");
        fetchAccounts();
        // console.log(res);
      })
      .catch((err) =>
        toast.error("Error coming from server please try again later")
      );
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // data fetch from server
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "http://43.154.22.219:3091/api/dev/addcharges"
      );
      setCharges(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  // data delete from server and also frontend
  // http://localhost:5001/delete/:id
  // http://43.154.22.219:3091/api/dev/addcharges/:id

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://43.154.22.219:3091/api/dev/addcharges/${id}`);
      fetchAccounts();
    } catch (error) {
      toast.error("You can't delete now. Please try again later!");
    }
  };

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-violet-500 text-center mt-5">
        All Charges Entry Form
      </h1>
      <div className="mt-8">
        <Link to="/exportimport" className="">
          <BsArrowLeft className="w-56 lg:w-[380px] h-[35px] text-purple-500" />
          <div className="w-8 h-[2px] bg-green-700 ml-[95px] lg:ml-[175px] animate-pulse"></div>
        </Link>
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
                name="particularExpenseName"
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
                type="text"
                inputMode="decimal"
                pattern="[0-9]*[.]?[0-9]*"
                step="any"
                // maxLength="9"
                // validate="true"
                name="particularExpenseCost"
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
        <h1 className="text-center my-6 text-2xl text-info font-bold bg-slate-500 p-[10px] rounded-lg uppercase">
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
                  <td>{charge.particularExpenseName}</td>
                  <td>{charge.particularExpenseCost * 1}</td>
                  <td className="flex justify-evenly items-center">
                    <Link to={`/addcharges/${charge.id}`}>
                      <AiOutlineEdit className="w-6 h-6 text-purple-600" />
                    </Link>
                    <button onClick={() => handleDelete(charge?.id)}>
                      <AiOutlineDelete className="w-6 h-6 text-red-600" />
                    </button>
                  </td>
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
