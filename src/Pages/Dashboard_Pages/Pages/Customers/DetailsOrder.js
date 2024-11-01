import "./DetailsOrder.css";
import { useEffect, useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Dashboard from "../Dashboard";
import Customers from "./Customers";
import ProgressOrder from "./ProgressOrder";
import { getData, imageStorageURL } from "../../../../axiosConfig/API";

export default function DetailsOrder() {
  // const currentStep = 0;
  const { id } = useParams();
  const [deliveryOrder, setDeliveryOrder] = useState(null);
  const [userMeals, setUserMeals] = useState(null);
  const [userAddons, setUserAddons] = useState(null);
  const [userExtras, setUserExtras] = useState(null);
  const [offers, setOffers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pay, setPay] = useState(null);
  const [status, setStatus] = useState(null);

  const sizeMap = {
    1: "Small",
    2: "Medium",
    3: "Big",
    4: "Family"
};
const statusMap = {
  "Not Started": 1,
  "In Progressing": 2,
  "Cancelled": 3,
  "Accepted": 4
};

  const fetchOrder = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/orders/${id}`);
      setDeliveryOrder(result);
      setUserMeals(result.order_meals);
      setUserAddons(result.order_addons);
      setUserExtras(result.order_extras);
      setOffers(result.order_offers);
      setPay(result.pay === 1 ? "Paid" : "Not Paid");
      setStatus(result.status);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);
  const currentStep = statusMap[status] || 0;

  useEffect(() => {
    fetchOrder(id);
  }, [id, fetchOrder]);

  if (loading || !userMeals) return;

  return (
    <div className="DataTable DetailsOrder">
      <div className="Breadcrumb">
        <div className="col-12 p-0 mb-3">
          <ul>
            <li>
              <Link to="/admin/dashboard" element={<Dashboard />}>
                dashboard
              </Link>
            </li>
            <span> / </span>
            <li>
              <Link to="/admin/dashboard/customers" element={<Customers />}>
                customers
              </Link>
            </li>
            <span> / </span>
            <li>details order</li>
          </ul>
        </div>
      </div>

      <div className="sections">
        <div className="section">
          <div className="timeLine-details">
            <p>
              <label>order id:</label>
              <b>#{deliveryOrder.id}</b>
              
            </p>
            <p>{deliveryOrder.created_at}</p>
            <p>Status :{deliveryOrder.status}</p>
            {/* <p>
              <b>order type: </b>
              <span style={{ "--c": "#1772FF", "--bg": "#E8F2FF" }}>
                {"delivery"}
              </span>
            </p> */}
          </div>
          <div className="timeLine-points">
            <div className="points">
              <ProgressOrder currentStep={currentStep} />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="order-details">
            <b>order details</b>
            <div className="cards">
              {/* meals */}
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
                          <p className="name">{meal.meal.name}</p>
                          <p className="name">Size: {sizeMap[meal.size]}</p>
                          <p className="quantity">
                            Quantity choice: <span className="fw-bold">{meal.quantity} pcs</span>
                          </p>
                          <b className="total">{meal.total_cost} OMR</b>
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
                          <b className="total">{addon.total_cost} OMR</b>
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
                          <b className="total">price: {offer.total_cost} OMR</b>
                        </div>
                      </div>
                    </>
                  ))}
            </div>
          </div>
        </div>

        {deliveryOrder.address && (
          <div className="section">
            <div className="delivery-address">
              <label>Address: </label>
              <b>{deliveryOrder.address}</b>
            </div>
          </div>
        )}

        {/* {deliveryOrder.DiningTable_id && (
          <div className="section">
            <div className="delivery-address">
              <label>Dining Table id: </label>
              <b>{deliveryOrder.DiningTable_id}</b>
            </div>
          </div>
        )} */}

        <div className="section">
          <div className="payment-info">
            <p>
              <label>payment type:</label>
              <b>{deliveryOrder.PaymentType}</b>
            </p>
            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color: pay === "Paid" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {pay === "Paid" ? "Paid" : "Not Paid"}
              </span>           
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
