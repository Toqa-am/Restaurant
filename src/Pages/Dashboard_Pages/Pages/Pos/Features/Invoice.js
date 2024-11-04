import "./Invoice.css";
import React, { useEffect, useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { addData, getData } from "../../../../../axiosConfig/API";


export default function Invoice({ visible, modalClose }) {
  const [invoiceItem, setInvoiceItem] = useState({});
  const [cartItemTotal, setCartItemTotal] = useState(false);
  const [invoiceid, setinvoiceid] = useState("");



  let check = "mostafa"

  let deletFn =()=>{
    console.log(invoiceid);
    window.print()    
    localStorage.setItem("invoiceId",  JSON.stringify(""));
    }

    
      const fetchOrderToInvoice = async () => {
        try {
          const storedId = JSON.parse(localStorage.getItem("invoiceId") || "");
          setinvoiceid(storedId) 
          const order = await getData(`admin/orders/invoice/${storedId}`);
          // console.log(order);
          setInvoiceItem(order)
        } catch (error) {
          console.error(error.response?.data?.message);
        }
      }
      console.log(invoiceItem);

    
  useEffect(() => {
    // localStorage.setItem("invoiceId",  JSON.stringify(""));

    const storedId = JSON.parse(localStorage.getItem("invoiceId") ||  localStorage.setItem("invoiceId",  JSON.stringify("")));
    setinvoiceid(storedId)
    fetchOrderToInvoice()
    // const storeCartItem = JSON.parse(localStorage.getItem("cartItems") || []);
    // setInvoiceItem(storeCartItem);
    let totalCost = 0;
    // storeCartItem.forEach((item) => {
    //   if (item.sizes) {
    //     item.sizes.forEach((size) => {
    //       totalCost += size.cost * size.quantity;
    //     });
    //   }
    //   if (item.addons) {
    //     item.addons.forEach((addon) => {
    //       totalCost += addon.cost * addon.quantity;
    //     });
    //   }
    //   if (item.extras) {
    //     item.extras.forEach((extra) => {
    //       totalCost += extra.cost * extra.quantity;
    //     });
    //   }
    // });

    setCartItemTotal(totalCost.toFixed(2));
  }, []);

  const convert = (value) => {
    return value === "SMALL"
      ? "SMALL"
      : value === "MEDIUM"
      ? "medium"
      : value === "BIG"
      ? "big"
      : value === "FAMILY"
      ? "family"
      : "none";
  };

  return (
    <div className={`modal-overlay invoice ${visible ? "visible" : ""}`}>
    <div className="modal-container">
      <div className="modal-content">
        <div className="options">
          <button className="btn btn-danger" onClick={modalClose}>
            cancel
          </button>
          <button className="btn btn-success" onClick={deletFn}>
            <PrinterOutlined />
            print invoice
          </button>
        </div>
  
        <div className="message-qrCode">
          <div>resta</div> - restaurant menu maker and contactless menu
          ordering system
        </div>
  
        <div className="restaurant-address">
          <p>{"house:25, road no:2, block a, mirpur-1, dhaka 1216"}</p>
          <p>tel: {"+4545344545"}</p>
        </div>
  
        <div className="id_date">
          <p>
            <span>order id : </span>
            <span>{invoiceItem?.order?.id}</span>
          </p>
          <p>
            <span>Date : {invoiceItem?.order?.created_at}</span>
            {/* <span>{"11:54 pm"}</span> */}
          </p>
        </div>
  
        <div className="menu">
          <table>
            <thead>
              <tr>
                <th key="0">qty</th>
                <th key="1">item description</th>
                <th key="2">price</th>
              </tr>
            </thead>
  
            <tbody>
              {  invoiceItem?.meals &&
              invoiceItem.meals?.length > 0  ? (
                invoiceItem.meals.map((item, index) => (
                  <tr key={`${index}`}>
                    <td>x {item.quantity}</td>
                    <td>
                      <span>{item.name}</span>
                      <span>size: {convert(item.size)}</span>
                    </td>
                    <td>{item.cost} OMR</td>
                  </tr>
                ))
              ) : (
                ""
              )}
            </tbody>
  
            {/* Addons */}
            { invoiceItem?.addons &&
            invoiceItem.addons?.length > 0 && (
              <tbody>
                {invoiceItem.addons.map((addon, index) => (
                  <tr className="addons" key={`${index}`}>
                    <td>x {addon.quantity}</td>
                    <td>{addon.name}</td>
                    <td>{addon.cost} OMR</td>
                  </tr>
                ))}
              </tbody>
            )}
  
            {/* Extras */}
            {invoiceItem?.extras &&
            invoiceItem.extras?.length > 0 && (
              <tbody>
                {invoiceItem.extras.map((extra, index) => (
                  <tr className="extras" key={`${index}`}>
                    <td>x {extra.quantity}</td>
                    <td>{extra.name}</td>
                    <td>{extra.cost} OMR</td>
                  </tr>
                ))}


              </tbody>
            )}

          {invoiceItem?.offers &&
          invoiceItem.offers?.length > 0 && (
              <tbody>
                {invoiceItem.offers.map((offer, index) => (
                  <tr className="extras" key={`${index}`}>
                    <td>x {offer.quantity}</td>
                    <td>
                      <span>{offer.name}</span>
                      <span>items: {offer.items}</span>
                    </td>
                    <td>{offer.cost} OMR</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
  
        <div className="total">
          <div className="row">
            <div className="col">SUBTOTAL</div>
            <div className="col">
              {invoiceItem?.order?.sub_total ? invoiceItem.order.sub_total.toFixed(2) : "0.00"} OMR
            </div>
          </div>
  
          <div className="row">
            <div className="col">TOTAL TAX</div>
            <div className="col"> {invoiceItem?.order?.tax} OMR </div>
            
          </div>
  
          {
            invoiceItem?.order?.delivery_fee ?
          
            <div className="row">
            <div className="col">Delivery Fee</div>
            <div className="col">{invoiceItem?.order?.delivery_fee ? invoiceItem.order.delivery_fee.toFixed(2) : "0.00"} OMR</div>
            </div>
            :"" 
          }
  
          <div className="row fw-bold">
            <div className="col">TOTAL</div>
            <div className="col">{invoiceItem?.order?.total_cost} OMR</div>
          </div>
        </div>
  
        <div className="payment">payment type <strong>{invoiceItem?.order?.payment_type}</strong> </div>
  
        <div className="messageThank">
          <p>thank you</p>
          <p>please come again</p>
        </div>
  
        <div className="powered_by">
          <label>powered_by</label>
          <div>resta</div> - restaurant menu maker and contactless menu
          ordering system
        </div>
      </div>
    </div>
  </div>
  
  )
}
