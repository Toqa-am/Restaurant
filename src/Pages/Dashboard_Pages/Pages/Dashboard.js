import "./Dashboard.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { BsFront } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { RiMoneyDollarCircleFill, RiAlignItemLeftFill } from "react-icons/ri";
import LineChartComponent from "./Charts/LineChartComponent";
import AreaChartComponent from "./Charts/AreaChartComponent";
import ImageTest from "../../../assets/global/profile.png";
import { getData , imageStorageURL} from "../../../axiosConfig/API";

export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date());
  const [Items, setItems] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [sales, setSales] = useState("");


  const data = [
    { date: "2024-07-01", sales: 4.5 },
    { date: "2024-07-02", sales: 0.0 },
    { date: "2024-07-03", sales: 0.0 },
    { date: "2024-07-04", sales: 0.0 },
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning!");
    else if (hour < 18) setGreeting("Good afternoon!");
    else setGreeting("Good evening!");
  }, []);


  const fetchDataSales = useCallback(async () => {
    try {
      const result = await getData("admin/sales");
      sessionStorage.removeItem("origin_data");
      setSales(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  const fetchDataEmployee = useCallback(async () => {
    try {
      const result = await getData("admin/refresh");
      sessionStorage.removeItem("origin_data");
      setEmployee(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  const fetchMostPopularItems = useCallback(async () => {
    try {
      const result = await getData("admin/MostPopularItems");
      sessionStorage.removeItem("origin_data");
      setItems(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchMostPopularItems();
    fetchDataEmployee();
    fetchDataSales();
  }, [fetchMostPopularItems,fetchDataEmployee,fetchDataSales]);

  return (
    <div className="Dashboard">
      <div className="reminder alert-danger p-3 rounded-2 mb-3">
        <p>reminder!</p>
        <p className="text-secondary">
          Data will be reset at the beginning of each month.
        </p>
      </div>

      <div className="welcome-user pl-2 pr-2 mb-5">
        <h3>{greeting}</h3>
        <h4>{employee.name}</h4>
      </div>

      <div className="datePicker mb-3 pl-2 pr-2">
        <DatePicker
          className="picker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <h4>overview!</h4>
      </div>

      <div className="row totalCarts pl-2 pr-2">
        <div className="col col-12 col-sm-6 col-xl-3 p-2">
          <div className="d-flex align-items-center gap-2 p-3 rounded-2">
            <div className="icon">
              <RiMoneyDollarCircleFill />
            </div>
            <h6 className="text-white">Total Sales</h6>
          </div>
        </div>
        <div className="col col-12 col-sm-6 col-xl-3 p-2">
          <div className="d-flex align-items-center gap-2 p-3 rounded-2">
            <div className="icon">
              <BsFront />
            </div>
            <h6 className="text-white">Total Orders</h6>
          </div>
        </div>
        <div className="col col-12 col-sm-6 col-xl-3 p-2">
          <div className="d-flex align-items-center gap-2 p-3 rounded-2">
            <div className="icon">
              <FaUserGroup />
            </div>
            <h6 className="text-white">Total Customers</h6>
          </div>
        </div>
        <div className="col col-12 col-sm-6 col-xl-3 p-2">
          <div className="d-flex align-items-center gap-2 p-3 rounded-2">
            <div className="icon">
              <RiAlignItemLeftFill />
            </div>
            <h6 className="text-white">Total Menu Items</h6>
          </div>
        </div>
      </div>

      <div className="row chartParent">
        <div className="col-12 col-xl-6 pl-3 pr-3 mb-4">
          <div className="section">
            <div className="section-head">
              <DatePicker
                className="picker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <h5>sales summary</h5>
            </div>

            <div className="section-body">
              <ul>
                <li>
                  <div>
                    <IoStatsChart />
                    <p>total sales</p>
                  </div>
                </li>
                <li>
                  <div>
                    <IoStatsChart />
                    <p>avg. sales per day</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="section-chart">
              <LineChartComponent data={data} />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6 pl-3 pr-3 mb-4">
          <div className="section">
            <div className="section-head">
              <DatePicker
                className="picker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <h5>order stats</h5>
            </div>

            <div className="section-body"></div>

            <div className="section-chart">
              <AreaChartComponent />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6 pl-3 pr-3 mb-4">
          <div className="section">
            <div className="section-head">
              <h5>featured items</h5>
            </div>
            <div className="section-body">
              <div className="cards">
                {Items.map((item, index) => (
                  <Link
                    to={`/admin/dashboard/meals/show/${item.id}`}
                    className="card"
                    key={index}
                  >
                    <div className="card-img">
                      <img loading="lazy" src={`${imageStorageURL}/${item.image}`} alt={item.name} />
                    </div>
                    <div className="card-title">{item.name}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6 pl-3 pr-3 mb-4">
          <div className="section">
            <div className="section-head">
              <h5>most popular items</h5>
            </div>
            <div className="section-body">
              <div className="cards popular">
                {Items.map((item, index) => (
                  <Link
                    to={`/admin/dashboard/meals/show/${item.id}`}
                    className="card"
                    key={index}
                  >
                    <div className="card-img">
                      <img loading="lazy" src={`${imageStorageURL}/${item.image}`} alt={item.name} />
                    </div>
                    <div className="card-text">
                      <p>{item.name}</p>
                      <p>{item.cost}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
