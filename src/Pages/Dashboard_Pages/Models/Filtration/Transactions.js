import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import ActionsFilter from "./ActionsFilter";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { addData } from "../../../../axiosConfig/API";
import axios from "axios";

export default function Transactions({
  handleModalToggle,
  data,
  headers,
  filtrated,
}) {
  const [transactions, setTransactions] = useState({
    created_at: "",
    payment_method: "",
    order_id: "",
    amount: "",
  });
  const [filteredData, setFilteredData] = useState();
  const [AmountwithDraw, setAmountwithDraw] = useState({
    amount: "",
  });
  const [balance, setBalance] = useState({});
  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/current-balance"
      );
      setBalance(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChange = (e) => {
    const data = { ...AmountwithDraw };
    data[e.target.name] = e.target.value;
    setAmountwithDraw(data);
  };

  useEffect(() => {
    fetchBalance();
    setFilteredData(data);
  }, [data]);

  const handleChange = (e) => {
    setFilteredData(JSON.parse(sessionStorage.getItem("origin_data")));
    const { name, value } = e.target;
    if (name === "created_at") {
      setTransactions((prevData) => ({
        ...prevData,
        created_at: formatDate(value),
      }));
    } else {
      setTransactions({ ...transactions, [name]: value });
    }
  };

  function formatDate(dateString) {
    return new Date(dateString)
      .toLocaleString("sv-SE", { timeZone: "UTC" })
      .replace("T", " ");
  }

  const handleSearch = () => {
    const { created_at, payment_method, order_id, amount } = transactions;
    const filtered = filteredData.filter((item) => {
      return (
        (!created_at || item.created_at <= created_at) &&
        (!payment_method ||
          item.payment_method
            .toLowerCase()
            .includes(payment_method.toLowerCase())) &&
        (order_id === "" || item.order_id === parseInt(order_id)) &&
        (amount === "" || item.amount === parseInt(amount))
      );
    });

    setFilteredData(filtered);
    filtrated(filtered);
  };

  const handleClear = () => {
    setTransactions({
      created_at: "",
      payment_method: "",
      order_id: "",
      amount: "",
    });
    setFilteredData(JSON.parse(sessionStorage.getItem("origin_data")));
    filtrated(JSON.parse(sessionStorage.getItem("origin_data")));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "",
      text: `Are you sure you want to SEND AMOUNT ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: `Yes,`,
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      // inside i will make all operation to send object of data
      let custObj = {};
      if (AmountwithDraw.amount !== null) {
        custObj.amount = AmountwithDraw.amount;
      }
      if (result.isConfirmed) {
        try {
          const response = await addData("admin/withdrawals", {
            amount: custObj.amount,
          });
          console.log("response", response);
          if (response.status === "success") {
            fetchBalance();
            setAmountwithDraw({ amount: "" });
            const event = new Event("storageUpdated");
            window.dispatchEvent(event);
            setTimeout(() => {
              Swal.fire("Saved!", response.message, "success");
            }, 250);
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message, "error");
        }
      }
    });
  };

  return (
    <div className="headerTable">
      <ActionsFilter
        handleModalToggle={handleModalToggle}
        data={data}
        headers={headers}
        balance={balance}
      />

      <div
        className="Transactions FiltrationModel collapse"
        id="collapseTarget"
      >
        <div className="row pb-4">
          <div className="row mt-3">
            {/* <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="created_at" className="mb-2">
                date
              </label>
              <input
                type="datetime-local"
                className="form-control"
                name="created_at"
                id="created_at"
                value={transactions.date}
                onChange={(e) => handleChange(e)}
              />
            </div> */}
            {/* form send id */}
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label for="exampleInputPassword1">
                  enter amount of withdrawals
                </label>
                <input
                  type="text"
                  value={AmountwithDraw.amount}
                  required
                  min={0}
                  onChange={handleOnChange}
                  name="amount"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter your amount with drow will sent"
                />
                <div style={{ direction: "rtl" }} className="mt-2">
                  <button className="btn btn-info" type="submit">
                    send
                  </button>
                </div>
              </div>
            </form>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="payment_method" className="mb-2">
                payment method
              </label>
              <select
                className="form-control"
                name="payment_method"
                id="payment_method"
                value={transactions.payment_method}
                onChange={(e) => handleChange(e)}
              >
                <option value="" selected disabled>
                  --
                </option>
                <option value="cashed">cashed</option>
                <option value="VisaMasterCard">VisaMasterCard</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="order_id" className="mb-2">
                order id
              </label>
              <input
                type="number"
                className="form-control"
                name="order_id"
                id="order_id"
                value={transactions.order_id}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="amount" className="mb-2">
                amount
              </label>
              <input
                type="number"
                className="form-control"
                name="amount"
                id="amount"
                value={transactions.amount}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col col-3 d-flex gap-3">
              <button
                type="search"
                className="btn btn-primary"
                onClick={handleSearch}
              >
                <FaSearch />
                <span className="ps-2">search</span>
              </button>
              <button
                type="clear"
                className="btn btn-secondary"
                onClick={handleClear}
              >
                <HiXMark />
                <span className="ps-2">clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
