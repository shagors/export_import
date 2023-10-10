/* eslint-disable no-restricted-globals */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const AddCharges = () => {
  const [charges, setCharges] = useState([]);
  const navigate = useNavigate();

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
      .post(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/addcharges",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Data Successfully Uploaded to server", {
          position: "top-center",
        });
        fetchAccounts();
        navigate("/exportimport");
        // console.log(res);
      })
      .catch((err) =>
        toast.error("Error coming from server please try again later", {
          position: "top-center",
        })
      );
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // data fetch from server
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/addcharges"
      );
      setCharges(response?.data);
    } catch (error) {
      toast.error("Error getting data from server!", {
        position: "top-center",
      });
    }
  };

  // data delete from server and also frontend
  // http://localhost:5001/delete/:id
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this Charge?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/addcharges/${id}`
        );
        toast.warn("Data successfully Deleted!!", { position: "top-center" });
        fetchAccounts();
      } catch (error) {
        toast.error("You can't delete now. Please try again later!", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-violet-500 text-center mt-5">
        Charges Entry Form
      </h1>
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
            <div className="mt-5 flex justify-end gap-y-4">
              <Link
                to="/exportimport"
                className="btn btn-info font-bold px-10 py-1 text-purple-950 hover:text-purple-800 mx-5">
                Back
              </Link>
              <button
                className="btn btn-info px-10 active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-lg bg-violet-500 text-white font-bold hover:text-black"
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
                <th className="sticky top-0 bg-gray-200">ID</th>
                <th className="sticky top-0 bg-gray-200">Expencess Name</th>
                <th className="sticky top-0 bg-gray-200">Expencess Cost</th>
                <th className="sticky top-0 bg-gray-200">Actions</th>
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
