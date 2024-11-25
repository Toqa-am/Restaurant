import "./Invoice.css";
import React, { useCallback, useEffect, useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getData } from "../../../../axiosConfig/API";

export default function Invoice({ visible, modalClose }) {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [meals, setMeals] = useState([]);
  const [addons, setAddons] = useState([]);
  const [extras, setExtras] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [information, setInformation] = useState([]);

  const fetchInformation = useCallback(async () => {
    try {
      const result = await getData("admin/settings");
      setInformation(result);
      console.log(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  const fetchOrder = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/orders/invoice/${id}`);
      setOrder(result.order);
      setMeals(result.meals);
      setAddons(result.addons);
      setExtras(result.extras);
      setOffers(result.offers);
      setLoading(false);
      if (document.getElementById("Loader")) {
        document.getElementById("Loader").classList.remove("show");
      }
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchInformation();
    fetchOrder(id);
  }, [id, fetchOrder,fetchInformation]);

  if (loading) return null;

  return (
    <div className={`modal-overlay invoice ${visible ? "visible" : ""}`}>
      <div className="modal-container">
        <div className="modal-content">
          <div className="options">
            <button className="btn btn-danger" onClick={modalClose}>
              cancel
            </button>
            <button className="btn btn-success" onClick={() => window.print()}>
              <PrinterOutlined />
              print invoice
            </button>
          </div>

          <div className="message-qrCode">
            {information.name}
          </div>

          <div className="restaurant-address">
            {information.city && <p>city : {information.city}</p>}
            {information.address && <p>address : {information.address}</p>}
            {information.phone1 && <p>tel 1: {information.phone1}</p>}
            {information.phone2 && <p>tel 2: {information.phone2}</p>}
          </div>

          <div className="restaurant-address">
            <p>{"house:25, road no:2, block a, mirpur-1, dhaka 1216"}</p>
            <p>tel: {"+4545344545"}</p>
          </div>

          <div className="id_date">
            <p>
              <span>order id : {order.id} </span>
              {/* <span>{order.id}</span> */}
            </p>
            <p>
              <span>Date Time : {order.created_at}
              </span>
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
              {meals.length > 0 && (
                  <>
                  {meals.map((item, index) => (
                    <tr key={index}>
                      <td>x {item.quantity}</td>
                      <td>
                        <p>{item.name}</p>
                        <p>size: {item.size}</p>
                      </td>
                      <td className="nowrap">{item.cost}</td>
                    </tr>
                  ))}
                  </>
                )}

                {addons.length > 0 && (
                  <>
                    {addons.map((addon, index) => (
                      <tr key={index}>
                        <td>x {addon.quantity}</td>
                        <td>{addon.name}</td>
                        <td className="nowrap">{addon.cost}</td>
                      </tr>
                    ))}
                  </>
                )}

                {extras.length > 0 && (
                  <>
                    {extras.map((extra, index) => (
                      <tr key={index}>
                        <td>x {extra.quantity}</td>
                        <td>{extra.name}</td>
                        <td className="nowrap">{extra.cost}</td>
                      </tr>
                    ))}
                  </>
                )}

                {offers.length > 0 && (
                  <>
                    {offers.map((offer, index) => (
                      <tr key={index}>
                        <td>x {offer.quantity}</td>
                        <td>
                          <span>{offer.name}</span>
                          <span>items: {offer.items}</span>
                        </td>
                        <td className="nowrap">{offer.cost}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="total">
            <div className="row">
              <div className="col">SUBTOTAL</div>
              <div className="col">{order.sub_total.toFixed(2)} OMR</div>
            </div>

            <div className="row">
              <div className="col">TOTAL TAX</div>
              <div className="col">{order.tax} OMR</div>
            </div>

            {order.delivery_fee > 0 && (
              <div className="row">
                <div className="col">Delivery Fee</div>
                <div className="col">{order.delivery_fee.toFixed(2)} OMR</div>
              </div>
            )}

            <div className="row fw-bold">
              <div className="col">TOTAL</div>
              <div className="col">{order.total_cost} OMR</div>
            </div>
          </div>

          <div className="payment">payment type cash</div>

          <div className="messageThank">
            <p>thank you</p>
            <p>please come again</p>
          </div>

          {/* <div className="powered_by">
            <label>powered_by</label>
            <div>resta</div> - restaurant menu maker and contactless menu ordering system
          </div> */}
        </div>
      </div>
    </div>
  );
}
