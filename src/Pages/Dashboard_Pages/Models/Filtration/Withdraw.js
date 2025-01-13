import React, { useState, useEffect, } from "react";
import { HiXMark } from "react-icons/hi2";
import ActionsFilter from "./ActionsFilter";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { addData } from "../../../../axiosConfig/API";
import axios from "axios";
import Cookies from "js-cookie";

export default function WithDrawals({
  handleModalToggle,
  data,
  headers,
  filtrated,
}) {
  const [salesReports, setSalesReports] = useState({
    created_at: "",
    name: "",
    id: "",
    amount: "",
    employee_id: "",
  });
  const [filteredData, setFilteredData] = useState();
  const [AmountwithDraw, setAmountwithDraw] = useState({
    amount: "",
  });
  const [balance, setBalance] = useState({});
  
  const fetchBalance = async () => {
    try {
      const token = Cookies.get("token_resta");
      if (!token) {
        console.error("Token is missing, redirecting to login.");
        window.location.href = "/auth/login";
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/current-balance",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBalance(response.data);
    } catch (error) {
      console.error("Error fetching balance:", error);

      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, token might be invalid or expired.");
        Cookies.remove("token_resta");
        Cookies.remove("admin_resta");
        Cookies.set("logoutMessage", "Session expired, please login again.");
        window.location.href = "/auth/login";
      }
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
      setSalesReports((prevData) => ({
        ...prevData,
        created_at: formatDate(value),
      }));
    } else {
      setSalesReports({ ...salesReports, [name]: value });
    }
  };

  function formatDate(dateString) {
    return new Date(dateString)
      .toLocaleString("sv-SE", { timeZone: "UTC" })
      .replace("T", " ");
  }

  const handleSearch = () => {
    const { name, id, amount, employee_id, start_date, end_date } = salesReports;
    const originalData = JSON.parse(sessionStorage.getItem("origin_data"));
  
    const startDate = start_date ? new Date(start_date) : null;
    const endDate = end_date ? new Date(end_date) : null;
  
    if (startDate) startDate.setHours(0, 0, 0, 0);
    if (endDate) endDate.setHours(23, 59, 59, 999);
  
    const filtered = originalData.filter((item) => {
      const itemDate = new Date(item.created_at);
      itemDate.setHours(0, 0, 0, 0);
  
      const isInRange =
        (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
  
      return (
        isInRange &&
        (!name || item.name.toLowerCase().includes(name.trim().toLowerCase())) &&
        (!id || item.id === parseInt(id)) &&
        (!amount || item.amount === amount) &&
        (!employee_id || item.employee_id === parseInt(employee_id))
      );
    });
  
    setFilteredData(filtered);
    filtrated(filtered);
  };

  const handleClear = () => {
    setSalesReports({
      created_at: "",
      name: "",
      id: "",
      amount: "",
      employee_id: "",
      start_date: "",
      end_date: "",
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
      let custObj = {};
      if (AmountwithDraw.amount !== null) {
        custObj.amount = AmountwithDraw.amount;
      }
      if (result.isConfirmed) {
        try {
          const response = await addData("admin/withdrawals", {
            amount: custObj.amount,
          });
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
        className="salesReports FiltrationModel collapse"
        id="collapseTarget"
      >
        <div className="row pb-4">
          <div className="row mt-3">
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
                  placeholder="Enter your amount withdrawals will sent"
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
                name
              </label>
              <input
                className="form-control"
                name="name"
                id="name"
                value={salesReports.name}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="order_id" className="mb-2">
                id
              </label>
              <input
                type="number"
                className="form-control"
                name="id"
                id="id"
                value={salesReports.id}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="start_date" className="mb-2">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                name="start_date"
                id="start_date"
                value={salesReports.start_date}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="end_date" className="mb-2">
                To Date
              </label>
              <input
                type="date"
                className="form-control"
                name="end_date"
                id="end_date"
                value={salesReports.end_date}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="order_id" className="mb-2">
                employee id{" "}
              </label>
              <input
                type="number"
                className="form-control"
                name="employee_id"
                id="employee_id"
                value={salesReports.employee_id}
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
                value={salesReports.amount}
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
