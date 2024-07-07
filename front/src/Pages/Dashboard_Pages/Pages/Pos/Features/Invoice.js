import "./Invoice.css";
import React, { useState, useEffect } from "react";
import { PrinterOutlined } from "@ant-design/icons";

export default function Invoice({ show, onClose }) {
  const [storeItems, setStoreItems] = useState(0);
  const [invoiceTotal, setInvoiceTotal] = useState(0);

  useEffect(() => {
    const loadStoreItems = () => {
      const storeItems = JSON.parse(localStorage.getItem("storeItems")) || [];
      setStoreItems(storeItems);

      let newTotal = storeItems.reduce(
        (prev, item) => prev + item.price * item.quantity,
        0
      );
      setInvoiceTotal(newTotal);
    };

    loadStoreItems();
    window.addEventListener("storageUpdated", loadStoreItems);

    return () => {
      window.removeEventListener("storageUpdated", loadStoreItems);
    };
  }, []);

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    show && (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-content">
            <div className="options">
              <button className="btn btn-danger" onClick={onClose}>
                cancel
              </button>
              <button className="btn btn-success" onClick={handlePrintInvoice}>
                <PrinterOutlined />
                print invoice
              </button>
            </div>

            <div className="message-qrCode">
              foodScan - qrCode restaurant menu maker and contactless menu
              ordering system
            </div>

            <div className="restaurant-address">
              <p>{"house:25, road no:2, block a, mirpur-1, dhaka 1216"}</p>
              <p>tel: {"+4545344545"}</p>
            </div>

            <div className="id_date">
              <div>
                <span>order id</span>
                <b>{"#48448646"}</b>
              </div>
              <div>
                <span>{"02-05-2024"}</span>
                <span>{"11:54 pm"}</span>
              </div>
            </div>

            <div className="menu">
              <table>
                <thead>
                  <tr>
                    <th>qty</th>
                    <th>item description</th>
                    <th>price</th>
                  </tr>
                </thead>
                <tbody>
                  {storeItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.quantity}</td>
                      <td>
                        <p>{item.name}</p>
                        <p>size regular - 6</p>
                        <p>VAT ({"5.00"} %)</p>
                      </td>
                      <td>${item.price}</td>
                    </tr>
                  ))}
                </tbody>

                {/* totals */}
                <tbody className="totals">
                  <tr>
                    <td></td>
                    <td>SUBTOTAL</td>
                    <td>${invoiceTotal}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>TOTAL TAX</td>
                    <td>${"0.45"}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>DISCOUNT</td>
                    <td>${"0.0"}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>TOTAL</td>
                    <td>${invoiceTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="paymentType">
              <p>
                <span>payment type: </span>
                <span>{"Cash"}</span>
              </p>
            </div>

            <div className="messageThank">
              <p>thank you</p>
              <p>please come again</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
