import "./Style.css";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { TbInvoice } from "react-icons/tb";
import Swal from "sweetalert2";
import {
  getData,
  updateData,
  imageStorageURL,
} from "../../../../axiosConfig/API";
import { getUser, isAuth } from "../../../../axiosConfig/Auth";
import Invoice from "./Invoice";

export default function Show() {
  const { id } = useParams();
  const [deliveryOrder, setDeliveryOrder] = useState(null);
  const [userMeals, setUserMeals] = useState(null);
  const [userAddons, setUserAddons] = useState(null);
  const [userExtras, setUserExtras] = useState(null);
  const [offers, setOffers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pay, setPay] = useState(null);
  const [status, setStatus] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [orderOffers, setOrderOffers] = useState(null);
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [dataInvoise, setDataInvoise] = useState({
    meals: "",
    addons: "",
    extras: "",
    offers:" ",
  });

  const sizeMap = {
    1: "Small",
    2: "Medium",
    3: "Big",
    4: "Family"
};

  useEffect(() => {
    if (isAuth()) {
      const user = getUser();
      setUserRole(user.Role);
    }
  }, []);

  const fetchOrder = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/orders/${id}`);
      setDeliveryOrder(result.order);
      setUserMeals(result.order.order_meals);
      setUserAddons(result.order.order_addons);
      setUserExtras(result.order.order_extras);
      setOffers(result.order.order_offers);
      setOrderOffers(result.order_offers);
      setDataInvoise({
        meals: userMeals,
        addons: userAddons,
        extras: userExtras,
        offers:offers,
      });
      setPay(result.pay === 1 ? "Paid" : "Not Paid");
      setStatus(result.status);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchOrder(id);
    console.log(imageStorageURL);
  }, [id, fetchOrder]);

  const handlePayChange = async (e) => {
    e.preventDefault();
    let newPay = e.target.value;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the pay order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const formData = new FormData();
        formData.append("pay", newPay);
        formData.append("_method", "put");

        try {
          const response = await updateData(
            `admin/orders/${id}/checkPayStatus`,
            formData,
            false
          );

          if (response.status === "success") {
            setLoading(false);
            setPay(newPay === "1" ? "Paid" : "Not Paid");
            setTimeout(() => {
              Swal.fire("Updated!", response.message, "success");
            }, 250);
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message, "error");
        }
      }
    });
  };

  const handleStatusChange = async (e) => {
    e.preventDefault();
    let newStatus = e.target.value;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the status order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const formData = new FormData();
        formData.append("status", newStatus);
        formData.append("_method", "put");

        try {
          const response = await updateData(
            `admin/orders/${id}`,
            formData,
            false
          );

          if (response.status === "success") {
            setLoading(false);
            setStatus(newStatus);
            setTimeout(() => {
              Swal.fire("Updated!", response.message, "success");
            }, 250);
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message, "error");
        }
      }
    });
  };

  const handlePrintInvoice = () => {
    setInvoiceVisible(!invoiceVisible);
    if (document.getElementById("Loader") && !invoiceVisible) {
      document.getElementById("Loader").classList.add("show");
    }
    document.body.style.overflow = invoiceVisible ? "visible" : "hidden";
  };

  if (loading || !userMeals) return;

  return (
    <>
      <div className="Show">
        <div className="head">
          <div className="details">
            <h4 className="id">
              <label>order id:</label>
              <b>#{id}</b>
              <span className={pay}>{pay}</span>
              <span className={status}>{status}</span>
            </h4>

            <div className="date">
              <span className="fs-6">
                <MdDateRange />
              </span>
              <label>{deliveryOrder.created_at}</label>
            </div>

            <div className="payment_type">
              <label>payment type:</label>
              <b>{deliveryOrder.PaymentType}</b>
            </div>

            {/* <div className="delivery_time">
              <label>delivery time:</label>
              <b>
                {new Date(deliveryOrder.created_at).toLocaleString("sv-SE", {
                  timeZone: "UTC",
                  hour12: false,
                })}
              </b>
            </div> */}

            {deliveryOrder.DiningTable_id && (
              <div className="table_id">
                <label>table id:</label>
                <b>{deliveryOrder.DiningTable_id}</b>
              </div>
            )}

            
            {deliveryOrder.notes && (
              <div className="table_id">
                <label>Notes: </label>
                <b>{deliveryOrder.notes}</b>
              </div>
            )}

             {deliveryOrder.address && (
              <div className="table_id">
                <label>Address: </label>
                <b>{deliveryOrder.address}</b>
              </div>
            )}

             {deliveryOrder.phone && (
              <div className="table_id">
                <label>Phone: </label>
                <b>{deliveryOrder.phone}</b>
              </div>
            )}

          </div>

          <div className="options">
            {(userRole && userRole === "admin") || userRole === "casher" ? (
              <select
                name="payment_type"
                id="payment_type"
                value={pay === "Paid" ? "1" : "0"}
                onChange={handlePayChange}
              >
                <option value="1" disabled={pay === "Paid"}>
                  Paid
                </option>
                <option value="0" disabled={pay === "Not Paid"}>
                  Not Paid
                </option>
              </select>
            ) : (
              false
            )}

            <select
              name="status"
              id="status"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="Not Started" disabled={status === "Not Started"}>
                Not Started
              </option>
              <option value="In Progress" disabled={status === "In Progress"}>
                In Progress
              </option>
              <option value="Cancelled" disabled={status === "Cancelled"}>
                Cancelled
              </option>
              <option value="Accepted" disabled={status === "Accepted"}>
                Accepted
              </option>
            </select>

            <button
              className="btn btn-primary"
              onClick={() => handlePrintInvoice()}
            >
              <TbInvoice />
              invoice
            </button>
          </div>
        </div>

        <div className="body d-flex">
          <div className="sections sections-left">
            <div className="title">
              <b>order details</b>
            </div>

            <div className="section">
              <div className="cards">
               {/* Meals */}
               {userMeals && userMeals.length > 0 && (
                  <>
                    <h3>The meals</h3>
                    {userMeals.map((meal, index) => (
                      <div className="card" data-id={meal.quantity} key={meal.id || index}>
                        <div className="card-img">
                          <img
                            loading="lazy"
                            src={`${imageStorageURL}/${meal.meal.image}`}
                            alt={meal.meal.name}
                          />
                        </div>
                        <div className="card-text">
                          <p className="name fw-bold">{meal.meal.name}</p>
                          <p className="name">Size: {sizeMap[meal.size]}</p>
                          <p className="quantity">
                            Quantity choice: <span className="fw-bold">{meal.quantity} pcs</span>
                          </p>
                          <b className="total">Price: {meal.total_cost} OMR</b>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Addons */}
                {userAddons && userAddons.length > 0 && (
                  <>
                    <h3>The Addons</h3>
                    {userAddons.map((addon, index) => (
                      <div className="card" data-id={addon.quantity} key={addon.id || index}>
                        <div className="card-img">
                          <img
                            loading="lazy"
                            src={`${imageStorageURL}/${addon.addon.image}`}
                            alt={addon.addon.name}
                          />
                        </div>
                        <div className="card-text">
                          <p className="name fw-bold">{addon.addon.name}</p>
                          <p className="quantity">
                            Quantity choice: <span className="fw-bold">{addon.quantity} pcs</span>
                          </p>
                          <b className="total">Price: {addon.total_cost} OMR</b>
                        </div>
                      </div>
                    ))}
                  </>
                )}


                {/* Extras */}
                {Object(userExtras).length > 0 &&
                  userExtras.map((extra, index) => (
                    <>
                      {index < 1 ? <h3>the extras</h3> : false}
                      <div
                        className="card"
                        data-id={extra.quantity}
                        key={extra.id}
                      >
                        <div className="card-img">
                          <img
                            loading="lazy"
                            src={`${imageStorageURL}/${extra.extra_image}`}
                            alt={extra.extra.name}
                          />
                        </div>
                        <div className="card-text">
                          <p className="name fw-bold">{extra.extra.name}</p>
                          <p className="quantity">
                            quantity choice:
                            <span className="fw-bold">
                              {extra.quantity} pcs
                            </span>
                          </p>
                          <b className="total">Price: {extra.total_cost} OMR</b>
                        </div>
                      </div>
                    </>
                  ))}

                    {/* offers */}
                {Object(offers).length > 0 &&
                  offers.map((offer, index) => (
                    <>
                      {index < 1 ? <h3>the offers</h3> : false}
                      <div
                        className="card"
                        data-id={offer.quantity}
                        key={offer.id}
                      >
                        <div className="card-img">
                          <img
                            loading="lazy"
                            src={`${imageStorageURL}/${offer.offer_image}`}
                            alt={offer.offer.name}
                          />
                        </div>
                        <div className="card-text">
                          <p className="name fw-bold">{offer.offer.name}</p>
                          <p className="quantity">
                            quantity choice:
                            <span className="fw-bold">
                              {offer.quantity} pcs
                            </span>
                          </p>
                          <p className="name fw-bold" >items : </p>
                          <p className="name">{orderOffers[index].items}</p>
                          <b className="total">price: {offer.total_cost} OMR</b>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>

          <div className="sections sections-right">
          <div className="section">
            <div className="title">
              <b>subTotal</b>
              <b>{(deliveryOrder.total_cost - deliveryOrder.tax - deliveryOrder.delivery_fee).toFixed(2)} OMR</b>
            </div>

            {/* Conditionally render tax if it's greater than 0 */}
            {deliveryOrder.tax > 0 && (
              <div className="details">
                <b>Tax</b>
                <b>{deliveryOrder.tax.toFixed(2)} OMR</b>
              </div>
            )}

            {/* Conditionally render delivery fee if it's greater than 0 */}
            {deliveryOrder.delivery_fee > 0 && (
              <div className="details">
                <b>Delivery Fee</b>
                <b>{deliveryOrder.delivery_fee.toFixed(2)} OMR</b>
              </div>
            )}

            {/* Calculate and display the grand total */}
            <div className="details total">
              <b>Grand Total</b>
              <b>
                
                {(
                  Number(deliveryOrder.total_cost)
                ).toFixed(2)} OMR
              </b>
            </div>
          </div>
        </div>

        </div>
      </div>

      <div class="Pos">
        {invoiceVisible && (
          <Invoice visible={invoiceVisible} modalClose={handlePrintInvoice} />
        )}
      </div>
    </>
  );
}
