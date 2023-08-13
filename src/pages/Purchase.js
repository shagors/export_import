import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/purchase.css";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

const Purchase = () => {
  const [transportPath, setTransportPath] = useState([]);
  const [transportCountry, setTransportCountry] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [charges, setCharges] = useState([]);
  const [checks, setChecks] = useState([]);
  const [transportWay, setTransportWay] = useState("");
  const [transportCountryName, setTransportCountryName] = useState("");
  const [particularExpencessName, setParticularExpencessName] = useState([]);
  const [productChecks, setProductChecks] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const chaecksCost = JSON.stringify(checks);
  const productData = JSON.stringify(productChecks);

  // Data fetch from server
  // http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/
  useEffect(() => {
    //   getting transport data from server
    axios
      .get(
        "http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/transport"
      )
      .then((res) => setTransportPath(res.data))
      .catch((error) => setError(error));
    // console.log(transportPath[1].id);

    //   getting transport country data from server
    axios
      .get(
        "http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/transport_country"
      )
      .then((res) => setTransportCountry(res.data))
      .catch((error) => setError(error));

    //   getting accounts data from office_accounts server
    axios
      .get(
        "http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/office_accounts"
      )
      .then((res) => setAccounts(res?.data))
      .catch((error) => setError(error));

    // geeting charges api call
    axios
      .get(
        "http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/addcharges"
      )
      .then((res) => {
        setCharges(res?.data);
        // console.log(res?.data);
      })
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return toast.error("Error coming from server please try again later");
  }

  const handleToCheck = (e, index) => {
    setChecks([...checks, e.target.value]);
  };

  const handleProductCheck = (product) => {
    setProductChecks([...productChecks, product.id]);
  };

  const handleTransportWay = (event) => {
    setTransportWay(event.target.value);
  };

  const handleTransportCountryName = (event) => {
    const selectedCountryName = event.target.value;
    setTransportCountryName(event.target.value);
    // console.log(transportCountryName);
  };

  const handleParticularExpencessName = (event) => {
    setParticularExpencessName(event.target.value);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5001/office_accounts_clone/${id}`)
      .then((res) => {
        toast.success("Data Successfully Deleted!!");
      })
      .catch((error) => {
        toast.error("Something wrong can't delete");
      });
  };

  // save data
  const formSubmit = (e) => {
    e.preventDefault();
    const data = {
      transportWayId: transportWay,
      transportCountryId: transportCountryName,
      addChargesId: chaecksCost,
      officeAccountId: productData,
      // particularExpenseName: chaecksCost,
      // product: productData,
    };
    // toast.success("Successfully Uploaded!!");
    // navigate("/exportimport");
    // console.log(data);

    // http://localhost:5001/purchase
    // http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/purchase_account

    axios
      .post(
        "http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/purchase_account",
        data
      )
      .then((res) => {
        toast.success("Successfully Uploaded to server");
        navigate("/exportimport");
        // console.log(res);
      })
      .catch((err) =>
        toast.error("This error coming from server please try again later!!")
      );
  };

  return (
    <>
      <div>
        {/* top form select and checkbox design */}
        <div className="">
          <h1 className="flex justify-center items-center text-4xl my-4 uppercase text-info font-bold">
            Add Shipment Data :
          </h1>
          <div className="mt-8">
            <Link to="/exportimport" className="">
              <BsArrowLeft className="w-20 lg:w-[380px] h-[35px] text-purple-500" />
            </Link>
            <div className="w-8 h-[2px] bg-green-700 ml-[25px] lg:ml-[175px] animate-pulse"></div>
          </div>
          <div className="mt-5 lg:flex justify-center items-center">
            <form
              className="card lg:w-[700px] bg-base-100 shadow-xl mt-5"
              onSubmit={formSubmit}>
              <div className="lg:flex justify-between items-center">
                <div className="form-control  card-body">
                  <label className="text-center mb-3">
                    <span className="lebel-text text-lg font-semibold">
                      Product Shipment Way
                    </span>
                  </label>
                  <div className="input-group  flex lg:flex-none justify-center items-center">
                    <select
                      className="select select-info w-full max-w-xs"
                      id="selectOption"
                      value={transportWay}
                      name="transportWay"
                      onChange={handleTransportWay}>
                      <option selected>---- Pick Transport Way ----</option>
                      {transportPath?.map((product, index) => (
                        <option value={product.id} key={index}>
                          {product.transportWay}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-control card-body">
                  <label className="text-center mb-3">
                    <span className="lebel-text text-lg font-semibold">
                      Product Shipment Country
                    </span>
                  </label>
                  <div className="input-group  flex lg:flex-none justify-center items-center">
                    <select
                      className="select select-info w-full max-w-xs"
                      id="selectOption"
                      value={transportCountryName}
                      name="transportCountryName"
                      onChange={handleTransportCountryName}>
                      <option selected>---- Pick Shipment Country ----</option>
                      {transportCountry?.map((product, index) => (
                        <option value={product.id} key={index}>
                          {product.countryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* Tax and costing */}
              {/* particularExpencessName */}
              {/* particularExpenseName: ""*/}
              <div className="w-70 p-9 add__scrollbar">
                <div className="form-control">
                  {charges?.map((charge) => (
                    <label className="cursor-pointer label" key={charge.id}>
                      <span className="label-text">
                        {charge.particularExpenseName}
                      </span>
                      <input
                        type="checkbox"
                        className={`checkbox checkbox-info`}
                        id={charge.id}
                        value={charge.id}
                        name="particularExpenseName"
                        onChange={handleParticularExpencessName}
                        onClick={handleToCheck}
                      />
                    </label>
                  ))}
                </div>
              </div>
              {/* button */}
              <div className="flex justify-end items-center mr-7 py-5">
                <button
                  className="btn btn-info font-bold px-10 py-1 text-purple-950 hover:text-purple-800"
                  type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Table data get from accouts input database */}
        <div>
          <h1 className="text-center my-6 text-3xl text-info font-bold bg-slate-500 p-3 rounded-lg uppercase">
            Data Get From accounts Page
          </h1>
          <div className="overflow-x-auto add__scrollbar">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Select</th>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Product Brand</th>
                  <th>Product Model</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts?.map((product) => (
                  <tr className={`hover cursor-pointer`} key={product.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        name="product"
                        value={product.id}
                        onClick={() => handleProductCheck(product)}
                      />
                    </td>
                    <td>{product.id}</td>
                    <td>{product.productName}</td>
                    <td>{product.productBrand}</td>
                    <td>{product.productModel}</td>
                    <td>{product.productQuantity}</td>
                    <td>{product.date}</td>
                    <td>
                      <button onClick={() => handleDelete(product?.id)}>
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
    </>
  );
};

export default Purchase;
