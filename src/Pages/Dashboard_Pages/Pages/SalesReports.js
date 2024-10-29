import "./DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import Breadcrumb from "../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../Models/Filtration/ItemsReports";
import { getData } from "../../../axiosConfig/API";

export default function SalesReports() {
  const componentRef = useRef();
  const [salesReports, setSalesReports] = useState([]);

  const fetchSalesReports = useCallback(async () => {
    try {
      const result = await getData("admin/sales-reports");
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
      title: "DATE",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "PAYMENT METHOD",
      dataIndex: "PaymentType",
      key: "PaymentType",
    },
    {
      title: "Total Cost",
      dataIndex: "total_cost",
      key: "total_cost",
    },
    {
      title: "Pay",
      key: "pay",
      render: (item) => (
        <span
          className={
            parseFloat(item.pay) === 0
              ? "not_value"
              : parseFloat(item.pay) > 0
              ? "active"
              : "inactive"
          }
        >
          {item.pay === 0 ? "unpaid" : "paid"}
        </span>
      ),
    },
  ];

  const headers = [
    {
      label: "Id",
      key: "id",
    },
    {
      label: "Date",
      key: "created_at",
    },
    {
      label: "PaymentType",
      key: "PaymentType",
    },
    {
      label: "Order Id",
      key: "order_id",
    },
    {
      label: "total_cost",
      key: "total_cost",
    },
    {
      label: "Status",
      key: "status",
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
