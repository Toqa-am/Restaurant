import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoiceDollar,
  faUsers,
  faEnvelopeOpenText,
  faBriefcase,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";

function ContentDashboard() {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
      <div style={{ display: "flex", flexDirection: "column", padding: "20px"  }}>
          <div style={{ width: '100%', backgroundColor: '#FFE6E6', padding:'5px',marginBottom:'15px' }}>
              <h5>Reminder!</h5>
              <p style={{}} className="text-black text-opacity-50">Dummy data will be reset in every 30 minutes.</p>
          </div>
      <div style={{ marginBottom: "20px", textAlign: "" }}>
        <h2 style={{ color: "blue" }}>Good Morning!</h2>
        <h3 style={{ color: "gray" }}>Jone</h3>
      </div>
      <div>
        <h2 style={{ textAlign: "start" }}>Overview</h2>
        <div style={{ textAlign: "end" }}>
          <input
            type="date"
            id="dateInput"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "250px",
            height: "80px",
            margin: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#7469B6",
            color: "white",
          }}
        >
          <FontAwesomeIcon
            icon={faFileInvoiceDollar}
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <h5>Total Sales</h5>
        </div>
        <div
          style={{
            width: "250px",
            height: "80px",
            margin: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#AD88C6",
            color: "white",
          }}
        >
          <FontAwesomeIcon
            icon={faUsers}
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <h5>Total Customers</h5>
        </div>
        <div
          style={{
            width: "250px",
            height: "80px",
            margin: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#E1AFD1",
            color: "white",
          }}
        >
          <FontAwesomeIcon
            icon={faBriefcase}
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <h5>Total Orders</h5>
        </div>
        <div
          style={{
            width: "250px",
            height: "80px",
            margin: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FF70AB",
            color: "white",
          }}
        >
          <FontAwesomeIcon
            icon={faEnvelopeOpenText}
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <h5>Total Items</h5>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            width: "45%",
            height: "200px",
            margin: "10px",
            padding: "20px",
            border: "1px solid #ccc",
                      borderRadius: "8px",
            backgroundColor:'white'
          }}
        >
          <div>
            <h4
              style={{ textAlign: "start" }}
              className="text-black text-opacity-50"
            >
              Sales Summary
            </h4>
            <div style={{ textAlign: "end" }}>
              <input
                type="date"
                id="dateInput"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <hr style={{ width: "100%", borderTop: "1px solid #cccc" }} />
            <FontAwesomeIcon
              icon={faChartSimple}
              style={{
                width: "20px",
                height: "20px",
                marginRight: "10px",
                color: "gray",
              }}
            />
                      <h6 className="text-black text-opacity-50">Avg Sales</h6>
                      
                      
          </div>
        </div>

        <div
          style={{
            width: "45%",
            height: "200px",
            margin: "10px",
            padding: "20px",
            border: "1px solid #ccc",
                      borderRadius: "8px",
            backgroundColor:'white'
          }}
        >
          <div>
            <h4
              style={{ textAlign: "start" }}
              className="text-black text-opacity-50"
            >
              Order Status
            </h4>
            <div style={{ textAlign: "end" }}>
              <input
                type="date"
                id="dateInput"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <hr style={{ width: "100%", borderTop: "1px solid #cccc" }} />
          </div>
        </div>

       

        <div
          style={{
            width: "45%",
            height: "100%",
            margin: "10px",
            padding: "20px",
            border: "1px solid #ccc",
                      borderRadius: "8px",
            backgroundColor:'white'
          }}
        >
          <div>
            <h4
              style={{ textAlign: "start", height: "50px" }}
              className="text-black text-opacity-50"
            >
              Featured Item
            </h4>

            <hr style={{ width: "100%", borderTop: "1px solid #cccc" }} />
          </div>
              </div>
               <div
          style={{
            width: "45%",
            height: "100%",
            margin: "10px",
            padding: "20px",
            border: "1px solid #ccc",
                      borderRadius: "8px",
            backgroundColor:'white'
          }}
        >
          <div>
            <h4
              style={{ textAlign: "start", height: "50px" }}
              className="text-black text-opacity-50"
            >
              Most Popular Item
            </h4>

            <hr style={{ width: "100%", borderTop: "1px solid #cccc" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDashboard;
