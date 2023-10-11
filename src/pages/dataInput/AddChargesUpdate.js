import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddChargesUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    id,
    particularExpenseName: "",
    particularExpenseCost: 0,
  });

  // http://localhost:5001/addcharges/:id
  useEffect(() => {
    axios
      .get(
        `https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/addcharges/${id}`
      )
      .then((res) => {
        // console.log(res.data);
        setValues({
          ...values,
          particularExpenseName: res?.data.particularExpenseName,
          particularExpenseCost: res?.data.particularExpenseCost,
        });
      })
      .catch((error) =>
        toast.error("Error coming from server please try again later", {
          position: "top-center",
        })
      );
  }, [id, values]);

  // http://localhost:5001/addcharges/:id
  // https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/addcharges
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/addcharges`,
        values
      )
      .then((res) => {
        toast.success("Successfully Data Updated!!", {
          position: "top-center",
        });
        navigate("/addcharges");
      })
      .catch((err) =>
        toast.error("Something went wrong try again later", {
          position: "top-center",
        })
      );
  };

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-violet-500 text-center mt-5">
        Charge Update Form
      </h1>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[70%]">
          <div className="mt-6">
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Id
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-2 bg-transparent"
                placeholder="Enter Expencess Type"
                type="number"
                name="id"
                value={values.id}
                disabled
                onChange={(e) =>
                  setValues({
                    ...values,
                    particularExpenseName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                What Type of Expencess
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-2 bg-transparent"
                placeholder="Enter Expencess Type"
                type="text"
                name="particularExpencessName"
                value={values.particularExpenseName}
                id="particularExpencessName"
                onChange={(e) =>
                  setValues({
                    ...values,
                    particularExpenseName: e.target.value,
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
                type="text"
                name="particularExpencessCost"
                id="particularExpencessCost"
                value={values.particularExpenseCost}
                onChange={(e) =>
                  setValues({
                    ...values,
                    particularExpenseCost: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mt-5 gap-y-4">
              <Link to="/exportimport" className="btn btn-info px-10 mx-5">
                Back
              </Link>
              <button
                className="btn btn-info px-10 active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-lg bg-violet-500 text-white font-bold hover:text-black"
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
