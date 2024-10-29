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
    created_at: "",
    name: "",
    id: "",
    count: "",
  });
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
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

  // const handleSearch = () => {
  //   const { created_at, name, id, count } = salesReports;
  //   const filtered = filteredData.filter((item) => {
  //     return (
  //       (!created_at || item.created_at <= created_at) &&
  //       (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
  //       (id === "" || item.id === parseInt(id)) &&
  //       (count === "" || item.count === parseInt(count))
  //     );
  //   });

  //   setFilteredData(filtered);
  //   filtrated(filtered);
  // };



  const handleSearch = () => {
    const { created_at, name, id, count } = salesReports;

    const originalData = JSON.parse(sessionStorage.getItem("origin_data"));
    const filtered = originalData.filter((item) => {
      return (
        (!created_at || item.created_at <= created_at) &&
        (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
        (!id || item.id === parseInt(id)) &&
        (!count || item.count === parseInt(count))
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
      count: "",
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
            {/* <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="created_at" className="mb-2">
                date
              </label>
              <input
                type="datetime-local"
                className="form-control"
                name="created_at"
                id="created_at"
                value={salesReports.created_at}
                onChange={(e) => handleChange(e)}
              />
            </div> */}

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="payment_method" className="mb-2">
                name of Meal
              </label>
              <input
                className="form-control"
                name="name"
                id="name"
                value={salesReports.name}
                onChange={(e) => handleChange(e)}
              />
                {/* <option value="" selected disabled>
                  --
                </option>
                <option value="cashed">cashed</option>
                <option value="VisaMasterCard">VisaMasterCard</option>
                <option value="Unpaid">Unpaid</option>
              </select> */}
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="order_id" className="mb-2">
                Item id
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
              <label htmlFor="amount" className="mb-2">
                Count
              </label>
              <input
                type="number"
                className="form-control"
                name="count"
                id="count"
                value={salesReports.count}
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
