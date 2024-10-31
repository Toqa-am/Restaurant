import "./DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import Breadcrumb from "../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../Models/Filtration/Withdraw";
import { getData } from "../../../axiosConfig/API";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BsEye } from "react-icons/bs";

export default function WithDrowReport() {
  const componentRef = useRef();
  const [salesReports, setSalesReports] = useState([]);

  const fetchSalesReports = useCallback(async () => {
    try {
      const result = await getData("admin/withdrawals");   
      console.log(result);
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
      title: "employee id",
      dataIndex: "employee_id",
      key: "employee_id",
    },
    {
        title: "amount",
        dataIndex: "amount",
        key: "amount",
    },
    {
        title: "created_at",
        dataIndex: "created_at",
        key: "created_at",
    } 
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
      label: "employee_id",
      key: "employee_id",
    },
    {
      label: "amount",
      key: "amount",
    },
    {
      label: "created_at",
      key: "created_at",
    } 
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
