import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import ActionsFilter from "./ActionsFilter";
import { FaSearch } from "react-icons/fa";

export default function SalesReports({
  handleModalToggle,
  data,
  headers,
  filtrated,
}) {
  const [salesReports, setSalesReports] = useState({
    from_date: "",
    to_date: "",
    PaymentType: "",
    id: "",
    total_cost: "",
    pay: "",
  });

  const [filteredData, setFilteredData] = useState([]); 
  const [originalData, setOriginalData] = useState([]); 

  useEffect(() => {
    setFilteredData(data);
    // setOriginalData(data); 
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalesReports((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const { from_date, to_date, PaymentType, id, total_cost, pay } = salesReports;
    const filtered = originalData.filter((item) => {
      const createdAt = new Date(item.created_at);
      const fromDate = from_date ? new Date(from_date) : null;
      const toDate = to_date ? new Date(to_date) : null;

      return (
        (!from_date || createdAt >= fromDate) &&
        (!to_date || createdAt <= toDate) &&
        (!PaymentType ||
          (item.PaymentType &&
            item.PaymentType.toLowerCase().includes(PaymentType.toLowerCase()))) &&
        (id === "" || item.id === parseInt(id)) &&
        (total_cost === "" || item.total_cost == parseFloat(total_cost)) &&
        (pay === "" || item.pay === parseInt(pay))
      );
    });

    setFilteredData(filtered);
    filtrated(filtered);
  };

  const handleClear = () => {
    setSalesReports({
      from_date: "",
      to_date: "",
      PaymentType: "",
      id: "",
      total_cost: "",
      pay: "",
    });

    setFilteredData(JSON.parse(sessionStorage.getItem("origin_data")));
    filtrated(JSON.parse(sessionStorage.getItem("origin_data")));
   };

  return (
    <div className="headerTable">
      <ActionsFilter
        handleModalToggle={handleModalToggle}
        data={data}
        headers={headers}
      />

      <div
        className="salesReports FiltrationModel collapse"
        id="collapseTarget"
      >
        <div className="row pb-4">
          <div className="row mt-3">
            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="id" className="mb-2">
                Order ID
              </label>
              <input
                type="number"
                className="form-control"
                name="id"
                id="id"
                value={salesReports.id}
                onChange={handleChange}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="from_date" className="mb-2">
                From Date
              </label>
              <input
                type="date"
                className="form-control"
                name="from_date"
                id="from_date"
                value={salesReports.from_date}
                onChange={handleChange}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="to_date" className="mb-2">
                To Date
              </label>
              <input
                type="date"
                className="form-control"
                name="to_date"
                id="to_date"
                value={salesReports.to_date}
                onChange={handleChange}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="PaymentType" className="mb-2">
                Payment Method
              </label>
              <select
                className="form-control"
                name="PaymentType"
                id="PaymentType"
                value={salesReports.PaymentType}
                onChange={handleChange}
              >
                <option value="" disabled>
                  --
                </option>
                <option value="cashed">Cashed</option>
                <option value="VisaMasterCard">Visa/MasterCard</option>
              </select>
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="pay" className="mb-2">
                Pay
              </label>
              <select
                className="form-control"
                name="pay"
                id="pay"
                value={salesReports.pay}
                onChange={handleChange}
              >
                <option value="" disabled>
                  --
                </option>
                <option value="1">Pay</option>
                <option value="0">Unpaid</option>
              </select>
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="total_cost" className="mb-2">
                Total Cost
              </label>
              <input
                type="number"
                className="form-control"
                name="total_cost"
                id="total_cost"
                value={salesReports.total_cost}
                onChange={handleChange}
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
                <span className="ps-2">Search</span>
              </button>
              <button
                type="clear"
                className="btn btn-secondary"
                onClick={handleClear}
              >
                <HiXMark />
                <span className="ps-2">Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
