import "./DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import Breadcrumb from "../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../Models/Filtration/SalesReports";
import { getData } from "../../../axiosConfig/API";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BsEye } from "react-icons/bs";

export default function SalesReports() {
  const componentRef = useRef();
  const [salesReports, setSalesReports] = useState([]);

  const fetchSalesReports = useCallback(async () => {
    try {
      const result = await getData("admin/items-reports");      
      sessionStorage.removeItem("origin_data");
      setSalesReports(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchSalesReports();
  }, [fetchSalesReports]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img 
          src={`http://127.0.0.1:8000/storage/${image}`} 
          alt="Product" 
          style={{ width: 50, height: 50 }} 
        />
      ),
    },
    {
      title: "status",
      key: "status",
      render: (item) => (
        <span
          className={
            parseFloat(item.status) === 0
              ? "not_value"
              : parseFloat(item.status) > 0
              ? "active"
              : "inactive"
          }
        >
          {item.status === 1 ? "active" : "inactive" }
        </span>
      ),
    },

    {
      title: "ACTION",
      key: "table_name",
      render: (item) => (
        <>
          <Link
            to={`/admin/dashboard/${item.table_name}/show/${item.id}`}
            className="eyeIcon"
            data-tooltip="view"
            style={{ "--c": "#1772FF", "--bg": "#E2EDFB" }}
          >
            <BsEye />
          </Link>
        </>
      ),
    },
  ];

  const headers = [
    {
      label: "Id",
      key: "id",
    },
    {
      label: "name",
      key: "name",
    },
    {
      label: "count",
      key: "count",
    },
    {
      label: "image",
      key: "image",
    },
    {
      label: "Status",
      key: "status",
    },
    {
      label: "Amount",
      key: "amount",
    },
  ];

  return (
    <div className="DataTable">
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* Filtration */}
      <Filtration
        data={salesReports}
        headers={headers}
        filtrated={setSalesReports}
      />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={salesReports}
          pagination={Object(salesReports).length > 10}
        />
      </div>
    </div>
  );
}
