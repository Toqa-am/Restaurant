import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import ActionsFilter from "./ActionsFilter";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { addData } from "../../../../axiosConfig/API";
import axios from "axios";

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
        employee_id: ""
    });
    const [filteredData, setFilteredData] = useState();
    const [AmountwithDraw, setAmountwithDraw] = useState({
        amount: ""
    });
    const [balance, setBalance] = useState({});
    const fetchBalance = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/current-balance');
        setBalance(response.data)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    

    const handleOnChange = (e) => {
        const data = { ...AmountwithDraw }
        data[e.target.name] = e.target.value
        setAmountwithDraw(data)
    }
    useEffect(() => {
       fetchBalance()
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
    //   const { created_at, name, id, amount } = salesReports;
    //   const filtered = filteredData.filter((item) => {
    //     return (
    //       (!created_at || item.created_at <= created_at) &&
    //       (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
    //       (id === "" || item.id === parseInt(id)) &&
    //       (amount === "" || item.amount === parseInt(amount))
    //     );
    //   });

    //   setFilteredData(filtered);
    //   filtrated(filtered);
    // };
    const handleSearch = () => {
        const { created_at, name, id, amount, employee_id } = salesReports;
        const originalData = JSON.parse(sessionStorage.getItem("origin_data"));
        const filtered = originalData.filter((item) => {
            return (
                (!created_at || item.created_at <= created_at) &&
                (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
                (!id || item.id === parseInt(id)) &&
                (!amount || item.amount === (amount)) &&
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
            employee_id: ""
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
            let custObj = {}
            if (AmountwithDraw.amount !== null) {
                custObj.amount = AmountwithDraw.amount
            }
            if (result.isConfirmed) {
                try {
                    const response = await addData("admin/withdrawals", { amount: custObj.amount });
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
        }

        );
    }


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
                        {/* form send id */}
                        <form onSubmit={handleSubmit}>
                            <div class="form-group">
                                <label for="exampleInputPassword1" >enter amount of withdrawals</label>
                                <input type="text" value={AmountwithDraw.amount} required min={0} onChange={handleOnChange} name="amount" class="form-control" id="exampleInputPassword1" placeholder="Enter your amount withdrawals will sent" />
                                <div style={{ direction: "rtl" }} className="mt-2">
                                    <button className="btn btn-info" type="submit" >send</button>
                                </div>
                            </div>
                        </form>
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
                                name
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
                            <label htmlFor="order_id" className="mb-2">
                                employee id               </label>
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
