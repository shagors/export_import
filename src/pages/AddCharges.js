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

  // Data save for server------

  //  http://localhost:5001/addcharges

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/addcharges",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Data Successfully Uploaded to server");
        window.location.reload();
        console.log(res);
      })
      .catch((err) => toast.error(err));
  };

  // http://localhost:5001/addcharges
  // http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/addcharges/id

  useEffect(() => {
    axios
      .get(
        "http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/addcharges"
      )
      .then((res) => setCharges(res?.data))
      .catch((error) => setCharges(error));
  }, [charges]);

  // console.log(charges);

  // data delete from server and also frontend

  // http://localhost:5001/delete/:id

  const handleDelete = (id) => {
    // console.log(id);
    axios
      .delete(
        `http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/addcharges/${id}`
      )
      .then((res) => {
        toast.success("Data Successfully Deleted!!");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something wrong can't delete");
      });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-violet-500 text-center mt-5">
        All Charges Entry Form
      </h1>
      <div className="mt-8">
        <Link to="/exportimport" className="">
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
