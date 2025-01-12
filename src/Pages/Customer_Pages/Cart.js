import { useDispatch, useSelector } from "react-redux";
import CheckOutCard from "../../Components/Customer/CheckOutCard";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Navbar } from "../../Components/Customer/Navbar";

import { emptyCart, pointsUpdate, settings } from "../../Store/action";
import Swal from "sweetalert2";

export default function Cart() {

  const cartTotal = useSelector((state) => state.cartTotal);
  const customerCartItems = useSelector((state) => state.customerCartItems);
  const tableId = useSelector((state) => state.table_id);
  const tableNum = useSelector((state) => state.table_num);
  const points_num = useSelector((state) => state.points_num);
  const max_points_num = useSelector((state) => state.max_points_num);
  const min_points_num = useSelector((state) => state.min_points_num);
  const max_discount = useSelector((state) => state.max_discount);
  const currency_per_point = useSelector((state) => state.currency_per_point);
  const min_order_price = useSelector((state) => state.min_order_price);
  const points_for_one_currency = useSelector((state) => state.points_for_one_currency);
  const [pointsErrors, setPointsErrors] = useState("")
  const [points,setPoints] = useState("0");

  const [tableMan, settableMan] = useState();
  const [tables, setTables] = useState([]);
  const [tax,setTax]=useState(0)
  const [error, setError] = useState("");
  let notes = "";

  let history = useHistory();
  const dispatcher = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  let paymentData = {};

  localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
  localStorage.setItem("customerCartItems", JSON.stringify(customerCartItems));

  useEffect(() => {
    const getTables = async () => {
      try {
        const tabs = await axios.get("http://127.0.0.1:8000/api/dining-tables");
        setTables(tabs.data.data);
      } catch (error) { }
    };

    getTables();
    const getTax = async () => {
      try {
        const settings = await axios.get("http://127.0.0.1:8000/api/settings");
        setTax(settings.data.data.tax);
        
      } catch (error) {}
    };
    getTax()
    const updatepoints = async () => {

      try{
        const getInfo = await axios.get("http://127.0.0.1:8000/api/customers", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("CustomerToken")
            )}`,
                            "Content-Type": "multipart/form-data",
          },
        });
        dispatcher(pointsUpdate(getInfo.data.data.loyalty_points))
        
        
      }
      catch(error){
        
      }
}
updatepoints()
  }, []);

  function inputChg(event) {
    if (event.target.id !== "notes") {
      setPaymentMethod(event.target.value);
    } else {
      notes = event.target.value;
    }
  }

  function tableChg(id) {
    settableMan(id);
  }
  function validateLoyalityPoints(event) {
  setPoints(event.target.value);
    let p=event.target.value;
    
    if (p > 0) {
      let redeemedCurrency = p / points_for_one_currency
      if (cartTotal < min_order_price) {
        setPointsErrors(`Your order must be at least ${min_order_price} OMR`)
      }
      else if (p > max_points_num) {
        setPointsErrors(`Maximum number of points to exchange is ${max_points_num}`)
      }
      else if (p < min_points_num) {
        setPointsErrors(`Minimum number of points to exchange is ${min_points_num}`)
      }
      else if(cartTotal < min_order_price ){
        setPointsErrors(`Minimum order price is ${min_order_price}`)

      }
      else if( points_num < min_points_num){
        setPointsErrors(`Minimum Number of points is ${min_points_num}`)

      }
      else if (redeemedCurrency > cartTotal * 10 / 100) {


        setPointsErrors(`You'r trying to get more than ${max_discount}% discount, max number of points you can exchange is ${cartTotal * 10 / 100 * 10}`)
      }
      else {
        setPointsErrors("")

      }
    }
    else {
      setPointsErrors("")
    }






  }
  const paymentDetails = () => {
    paymentData.diningtable_id = tableId || tableMan;
    paymentData.total_cost = cartTotal;
    paymentData.notes = notes;
    paymentData.meal_ids = [];
    paymentData.addon_ids = [];
    paymentData.extra_ids = [];
    paymentData.offer_ids = [];
    paymentData.converted_points = parseFloat(points);
    
    customerCartItems.map((item) => {
      if (item.table_name === "meals") {
        let size;
        if (item.size === "Small") {

          size = 1;
        } else if (item.size === "Medium") {
          size = 2;

        } else if (item.size === "Big") {
          size = 3;

        } else if (item.size === "Family") {
          size = 4;

        }

        paymentData.meal_ids.push({
          id: item.id,
          cost: item.cost,
          quantity: item.quant,
          size: size,
        });
      }
      if (item.table_name === "addons") {
        paymentData.addon_ids.push({
          id: item.id,
          cost: item.cost,
          quantity: item.quant,
        });
      }
      if (item.table_name === "extras") {
        paymentData.extra_ids.push({
          id: item.id,
          cost: item.cost,
          quantity: item.quant,
        });
      }
      if (item.table_name === "offers") {
        paymentData.offer_ids.push({
          id: item.id,
          cost: item.total_price_after_discount,
          quantity: item.quant,
        });
      }
    });
    if (paymentData.meal_ids.length === 0) {
      delete paymentData.meal_ids;
    }
    if (paymentData.addon_ids.length === 0) {
      delete paymentData.addon_ids;
    }
    if (paymentData.extra_ids.length === 0) {
      delete paymentData.extra_ids;
    }
    if (paymentData.offer_ids.length === 0) {
      delete paymentData.offer_ids;
    }
    if (paymentData.converted_points == 0 || paymentData.converted_points == undefined || !paymentData.converted_points) {
      delete paymentData.converted_points;
    }
  };
  const checkOut = async (e) => {
    
    e.preventDefault();
    paymentDetails();
    if (JSON.parse(localStorage.getItem("CustomerToken"))) {
 
      
      if (paymentMethod === "dpay") {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/pay",

            paymentData,
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("CustomerToken")
                )}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          window.open(response.data["Invoice Data"].Data.InvoiceURL, "_blank");

          Swal.fire({
            title: "Done",
            text: "Youre order has been placed",
            icon: "success",
          });
        } catch (error) {
          if (error.response.data.message === "Unauthenticated.") {
            history.push("/customer/login");
          } else if (
            error.response.data.message ===
            "Either location_id (for delivery) or diningtable_id (for in-restaurant) must be provided."
          ) {
            Swal.fire({
              title: "Error",
              text: "Please choose a table",
              icon: "error",
            });
          }
          else {
            Swal.fire({
              title: "Error",
              text: error.response.data.message,
              icon: "error",
            });
          }
        }
      } else if (paymentMethod === "cash") {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/orders",

            paymentData,
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("CustomerToken")
                )}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          dispatcher(emptyCart());
          setIsLoggedIn(true);
          

          setError("");
          Swal.fire({
            title: "Done",
            text: "Youre order has been placed",
            icon: "success",
          });

          try{
            const getInfo = await axios.get("http://127.0.0.1:8000/api/customers", {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("CustomerToken")
                )}`,
                                "Content-Type": "multipart/form-data",
              },
            });
            dispatcher(pointsUpdate(getInfo.data.data.loyalty_points))
            
            
          }
          catch(error){
            
          }
        } catch (error) {
          if (error.response.data.message === "Unauthenticated.") {
            history.push("/customer/login");
          } else if (
            error.response.data.message ===
            "Either location_id (for delivery) or diningtable_id (for in-restaurant) must be provided."
          ) {
            Swal.fire({
              title: "Error",
              text: "Please choose a table",
              icon: "error",
            });
          }
        }
      }
    } else if (!JSON.parse(localStorage.getItem("CustomerToken"))) {
      setIsLoggedIn(false);
      history.push("/customer/login");
    }
  };

  return (
    <>
      <div className="main-container">
        <Navbar />
        <div className="bg-light ">
          <div className="d-flex justify-content-around  pt-5 flex-wrap">
            <div className="col-12 col-md-6 mb-4">
              <div className="text-left">
                <Link to="/">
                  <i className="fa-solid fa-backward pb-3 text-left"></i> Back
                  to Home
                </Link>
              </div>

              <div className="mb-4 text-left">
                <strong>
                  <p>Table</p>
                </strong>
                <hr />
                {tableNum ? (
                  <p>Inside Table-{tableNum}</p>
                ) : (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      const selectedId = tables.find(
                        (item) => item.place === e.target.value
                      )?.id;
                      if (selectedId) tableChg(selectedId);
                    }}
                  >
                    <option value="" selected disabled>
                      Choose your table
                    </option>
                    {tables.map((item) => (
                      <option key={item.id} value={item.place}>
                        {item.place}
                      </option>
                    ))}
                  </select>
                )}
                <br></br>
                <div className="d-flex justify-content-between align-items-center">
                  <strong>
                    <p>Your loyality points:</p>
                  </strong>
                  <div>
                    {points_num}
                  </div>


                  <div className="d-flex justify-content-between">
  <input
    type="number"
    className="form-control"
    id="loyality_points"
    placeholder="0"
    onChange={validateLoyalityPoints}
    disabled={cartTotal < min_order_price || points_num < min_points_num}
  />
</div>
<div className="cust-tooltip">
  <i className="bi bi-info-circle p-1"></i>
  <span className="cust-tooltiptext">
    <ul>
      <li>Minimum order cost is {min_order_price} OMR to be able to use loyality points.</li>
      <br />
      <li>Maximum number of points to exchange: {max_points_num}.</li>
      <br />
      <li>Minimum number of points to exchange: {min_points_num}.</li>
      <br />
      <li>Maximum discount you can have is {max_discount}%.</li>
      <br />
      <li>You get 1 OMR for every {points_for_one_currency} points.</li>
    </ul>
  </span>
</div>


                </div>
                <span className="text-danger">
                  {pointsErrors}
                </span>

              </div>
              <div className="">
                <strong className="text-left">
                  <p>Payment</p>
                </strong>
                <hr />
                <form>
                  <div className="form-check pb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="cash"
                      name="payment"
                      id="cash"
                      onChange={inputChg}
                      checked={paymentMethod === "cash"}
                    />
                    <label className="form-check-label" htmlFor="cash">
                      Cash
                    </label>
                  </div>
                  <div class="form-floating">
                    <textarea
                      class="form-control mb-3"
                      placeholder="Leave your notes here"
                      id="notes"
                      style={{ height: "100px" }}
                      onChange={inputChg}
                    ></textarea>
                    <label for="notes" className="pt-2">
                      Do you have any notes?
                    </label>
                  </div>
                  {/* <div className="form-check pb-3">
                                <input className="form-check-input" type="radio" value="dpay" name="payment" id="dpay" onChange={inputChg} 
                                checked={paymentMethod === 'dpay'}
                                 />
                                <label className="form-check-label" htmlFor="dpay">
                                    Digital payment
                                </label>
                            </div> */}
                  <button
                    type="submit"
                    className="btn primary rounded-pill col-6 placeOrder"
                    onClick={(e) => {
                      checkOut(e);
                    }}
                    disabled={ pointsErrors != "" || customerCartItems.length === 0 ? true : false}
                  >
                    Place order
                  </button>
                </form>
              </div>
            </div>
            <div className="col-10 col-md-4 text-center mb-4">
              <strong>
                <p>Cart Summary</p>
              </strong>
              {customerCartItems.map((item) => (
                <CheckOutCard
                  key={item.name}
                  img={item.image}
                  title={`${typeof item.size === "undefined" ? "" : item.size + "-"
                    } ${item.name}`}
                  price={item.cost || item.total_price_after_discount}
                  quant={item.quant}
                  desc={item.description || item.items}
                />
              ))}
              <div className="border rounded p-2">
                <div className="d-flex justify-content-around">
                  <span>Subtotal</span>
                  <span>{cartTotal} OMR</span>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                  <span>Tax</span>
                  <span>{tax}%</span>
                </div>
                <hr></hr>
                <div className="d-flex justify-content-around">
                  <span>Total</span>
                  <span>{cartTotal+(cartTotal*tax)/100} OMR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
