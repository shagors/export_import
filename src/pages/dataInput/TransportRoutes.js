import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

// loader css style
const override = {
  display: "block",
  margin: "25px auto",
};

const TransportRoutes = () => {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formTransportData, setFormTransportData] = useState({
    transportWay: "",
    transportCost: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormTransportData({
      ...formTransportData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchTransport();
  }, []);

  // products fetch from server
  const fetchTransport = async () => {
    try {
      const response = await axios.get(
        "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/transport"
      );
      // data see in table descending order
      const sortedData = response?.data.sort((a, b) => b.id - a.id);
      setTransports(sortedData);
      setLoading(false);
    } catch (error) {
      toast.error("Error getting data from server!", {
        position: "top-center",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isRouteExists = transports.some(
      (item) =>
        item.transportWay.toLowerCase() ===
        formTransportData.transportWay.toLowerCase()
    );

    if (isRouteExists) {
      toast.error("This Route already exists !!", {
        position: "top-center",
      });
    } else {
      axios
        .post(
          "https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/transport",
          formTransportData
        )
        .then((res) => {
          toast.success("Successfully Uploaded to server", {
            position: "top-center",
          });
          navigate("/exportimport");
          // console.log(res);
        })
        .catch((err) =>
          toast.error("Error coming from server please try again later", {
            position: "top-center",
          })
        );
    }
  };

  // product delete from server and also frontend
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this Product Data?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://grozziie.zjweiting.com:3091/web-api-tht-1/api/dev/transport/${id}`
        );
        toast.warn("Data successfully Deleted!!", { position: "top-center" });
        fetchTransport();
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
        Transport-Way Entry Form
      </h1>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[70%]">
          <div className="mt-8">
            <div>
              <label className="text-lg font-semibold" htmlFor="productName">
                Create Transport Way
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-3 bg-transparent"
                placeholder="Enter Transport way"
                type="text"
                name="transportWay"
                id="transportWay"
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="mt-3">
              <label className="text-lg font-semibold" htmlFor="productBrand">
                Transport Way Cost
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-3 bg-transparent"
                placeholder="Enter Transport Cost"
                type="number"
                name="transportCost"
                id="transportCost"
                onChange={handleChange}
                required
                min="0"
              />
            </div> */}
            <div className="mt-5 flex justify-end gap-y-4">
              <Link to="/exportimport" className="btn btn-info px-10 mx-5">
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

      {/* Table data get from products database */}
      <div className="w-full lg:w-3/4 mx-auto">
        <h1 className="text-center my-6 text-2xl text-info font-bold bg-slate-500 p-[10px] rounded-lg uppercase">
          All Transport Way's
        </h1>
        <div className="overflow-x-auto add__scrollbar">
          {loading ? (
            <div className="">
              <ClipLoader
                color={"#36d7b7"}
                loading={loading}
                size={50}
                cssOverride={override}
              />
              <p className="text-center font-extralight text-xl text-green-400">
                Please wait ....
              </p>
            </div>
          ) : (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="sticky top-0 bg-gray-200">ID</th>
                  <th className="sticky top-0 bg-gray-200">Transport Way</th>
                  {/* <th className="sticky top-0 bg-gray-200">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {transports?.map((product) => (
                  <tr className="hover cursor-pointer" key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.transportWay}</td>
                    {/* <td className="flex justify-around items-center">
                      <Link to={`/datainput/${product.id}`}>
                        <AiOutlineEdit className="w-6 h-6 text-purple-600" />
                      </Link>
                      <button onClick={() => handleDelete(product.id)}>
                        <AiOutlineDelete className="w-6 h-6 text-red-600" />
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransportRoutes;
