import React, { useCallback, useEffect, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { FaTrash, FaXmark } from "react-icons/fa6";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import { addData, getData } from "../../../../../axiosConfig/API";

export default function CartItems({
  toggleCart,
  modalClose,
  total,
  detailsItemToggle,
}) {
  const [items, setItems] = useState([]);
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [finalTotalWithDiscount, setFinalTotalWithDiscount] = useState(0);
  const [customeEmail, setCustomerEmail] = useState([])
  const [floorsPlace, setFloorsPlace] = useState([])
  const [customeEmailSelectName, setCustomerEmailSelectName] = useState({
    customer_id: "",
    floorOrDielivery: "",
    delivery_fee:"",
    phone:null,
    address:'',
    DiningTable_id:null,
  })

  const fetchOffersItems = async () => {
    try {
      const customersData = await getData("admin/customers-active");
      // console.log(customersData);
      setCustomerEmail(customersData)
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }

  // fetsh floors name and ids 

  const fetchFloorsPlace = async () => {
    try {
      const dining_table_place = await getData("dining-tables");
      console.log(dining_table_place);
      setFloorsPlace(dining_table_place)
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }

  const dataFromSelection = async (e) => {
    const data = { ...customeEmailSelectName }
    data[e.target.name] = e.target.value
    setCustomerEmailSelectName(data)
    if (e.target.value === "floor") {
      await fetchFloorsPlace();
    }
  }
  // console.log(customeEmailSelectName);

  const handleApplyDiscount = useCallback(
    (totalCost) => {
      let discountAmount = 0;

      if (discountType === "percentage") {
        discountAmount = (totalCost * discountValue) / 100;
      } else if (discountType === "fixed") {
        discountAmount = discountValue;
      }

      const newFinalTotalWithDiscount = finalTotal - discountAmount;
      setFinalTotalWithDiscount(
        newFinalTotalWithDiscount > 0 ? newFinalTotalWithDiscount : 0
      );
    },
    [discountType, discountValue, finalTotal]
  );

  const updateFinalTotal = useCallback(
    (items) => {
      let totalCost = 0;

      if (Object(items).length > 0) {
        items.forEach((item) => {
          if (item.sizes) {
            // console.log(item.sizes.size);

            item.sizes.forEach((size) => {
              totalCost += size.cost * size.quantity;
            });
          }
          if (item.addons) {
            item.addons.forEach((addon) => {
              totalCost += addon.cost * addon.quantity;
            });
          }
          if (item.extras) {
            item.extras.forEach((extra) => {
              totalCost += extra.cost * extra.quantity;
            });
          }

          if (item.addoons) {
            if (item.addoons.cost) {

              totalCost += item.addoons.cost * item.sizes[0].quantity
            }


          }

        });

        setFinalTotal(totalCost);
        setFinalTotalWithDiscount(totalCost);
        total(totalCost);
      } else {
        setFinalTotal(0);
        setFinalTotalWithDiscount(0);
        total(0);
      }
    },
    [total]
  );


  useEffect(() => {
    total(finalTotal);
    fetchOffersItems()

    const loadStoreItems = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || []);
      setItems(cartItems);
      console.log(cartItems);

      updateFinalTotal(cartItems);

      if (cartItems.length < 1) {
        document.querySelector(".discountType").style.display = "none";
        document.querySelector(".paymentOption").style.display = "none";
      } else {
        document.querySelector(".discountType").style.display = "flex";
        document.querySelector(".paymentOption").style.display = "flex";
      }
    };

    loadStoreItems();
    window.addEventListener("storageUpdated", loadStoreItems);

    return () => {
      window.removeEventListener("storageUpdated", loadStoreItems);
    };
  }, [finalTotal, total, updateFinalTotal]);
  const updateQuantity = (idndexToIncrease, operation, typeOfDataToIncrease) => {
    const updatedItems =
      typeOfDataToIncrease === "meal"
        ? items.map((item, index) =>
          idndexToIncrease === index && typeOfDataToIncrease === "meal"
            ? {
              ...item,
              sizes: item.sizes.map((size) => {
                return true
                  ? {
                    ...size,
                    quantity:
                      operation === "increase"
                        ? ++size.quantity
                        : Math.max(size.quantity - 1, 1),
                  }
                  : size;
              }),
            }
            : item
        )
        : typeOfDataToIncrease === "addon"
          ? items.map((item, index) => {
            return {
              ...item,
              addons: item.addons.map((addon) =>
                idndexToIncrease === addon.UniqueId
                  ? {
                    ...addon,
                    quantity:
                      operation === "increase"
                        ? ++addon.quantity
                        : Math.max(addon.quantity - 1, 1),
                  }
                  : addon
              ),
            };
          })
          : typeOfDataToIncrease === "extra"
            ? items.map((item, index) => {
              return {
                ...item,
                extras: item.extras.map((extra) =>
                  idndexToIncrease === extra.UniqueId
                    ? {
                      ...extra,
                      quantity:
                        operation === "increase"
                          ? ++extra.quantity
                          : Math.max(extra.quantity - 1, 1),
                    }
                    : extra
                ),
              };
            })
            : items;

    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setItems(updatedItems);
    updateFinalTotal(updatedItems);
  };


  const handleMultiFunction = (type, label, name = null, indexToRemove, typeOfData,e) => {
    const removeOneItemFromCart = () => {

      let findItem
      if (typeOfData === "meal") {

        findItem = items.find((item, index) => indexToRemove == index)
        console.log(findItem);

        let { sizes, name, addoons, id, ...rest } = findItem


        const updatedItems = items.filter((item, index) => index !== indexToRemove);
        // إذا كانت addons غير فارغة، قم بإضافة rest إلى المصفوفة
        if (rest.addons.length !== 0 || rest.addons.length !== 0) {
          updatedItems.push(rest);
        }
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        console.log(updatedItems);
        updateFinalTotal(updatedItems);
      } else if (typeOfData === "addon") {



        // const updatedItems = items.addons.filter((item, index) => item.UniqueId !== indexToRemove);
        // const updatedItems = items.map((item, index) => item.addons.filter((addon)=> addon.UniqueId !== indexToRemove ));

        const updatedItems = items.map((item, index) => {
          // تحقق من أن addons موجودة وتقوم بتصفية العناصر بناءً على UniqueId
          return {
            ...item,
            addons: item.addons.filter(addon => addon.UniqueId !== indexToRemove) // تصفية الـ addons
          };
        });
        console.log(updatedItems);


        const isAllEmpty = updatedItems.every(item => item.addons.length === 0 && item.extras.length === 0 && item.name === "");


        // إذا كانت كل من addons و extras فارغة، قم بتعيين localStorage إلى مصفوفة فارغة
        if (isAllEmpty) {
          localStorage.setItem("cartItems", JSON.stringify([]));
        } else {
          localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        }
        console.log(updatedItems);
        updateFinalTotal(updatedItems);



      } else if (typeOfData === "extra") {


        // const updatedItems = items.addons.filter((item, index) => item.UniqueId !== indexToRemove);
        // const updatedItems = items.map((item, index) => item.addons.filter((addon)=> addon.UniqueId !== indexToRemove ));

        const updatedItems = items.map((item, index) => {
          // تحقق من أن addons موجودة وتقوم بتصفية العناصر بناءً على UniqueId
          return {
            ...item,
            extras: item.extras.filter(extra => extra.UniqueId !== indexToRemove) // تصفية الـ addons
          };
        });

        const isAllEmpty = updatedItems.every(item => item.addons.length === 0 && item.extras.length === 0 && item.name === "");

        // إذا كانت كل من addons و extras فارغة، قم بتعيين localStorage إلى مصفوفة فارغة
        if (isAllEmpty) {
          localStorage.setItem("cartItems", JSON.stringify([]));
        } else {
          localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        }
        console.log(updatedItems);
        updateFinalTotal(updatedItems);
      }
      const event = new Event("storageUpdated");
      window.dispatchEvent(event);
    };

  
    const resetItemsCart = () => {
      localStorage.setItem("cartItems", JSON.stringify([]));
      setItems([]);
      updateFinalTotal(localStorage.setItem("cartItems", JSON.stringify([])));

      const event = new Event("storageUpdated");
      window.dispatchEvent(event);
    };

    Swal.fire({
      title: label,
      text: `Are you sure you want to ${label}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: `Yes, ${label}`,
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      let customer_id=10;
      let total_cost=122;
      let tax = 39;
      let meal_ids=[
        {meal_id :4,
          quantity:1,
          total_cost:10
        }
      ]
      let objCustum ={}
      objCustum.customer_id=customer_id
      objCustum.total_cost=total_cost
      objCustum.tax=tax
      objCustum.meal_ids=meal_ids
      if (result.isConfirmed) {
        if (type === "makeOrder") {
          try {
            const response = await addData("auth/orders", objCustum);
            console.log("response", response);
            if (response.status === "success") {
              resetItemsCart();
              setTimeout(() => {
                Swal.fire("Saved!", response.message, "success");
              }, 250);
            }
          } catch (error) {
            Swal.fire("Error!", error.response?.data?.message, "error");
          }
        } else {
          if (document.getElementById("Loader")) {
            document.getElementById("Loader").classList.add("show");

            setTimeout(() => {
              document.getElementById("Loader").classList.remove("show");
              if (type === "deleteItem") {
                removeOneItemFromCart();
              } else if (type === "resetCart") {
                resetItemsCart();
              }
            }, 1500);
          } else {
            if (type === "deleteItem") {
              removeOneItemFromCart();
            } else if (type === "resetCart") {
              resetItemsCart();
            }
          }
        }
      }
    });
  };


  const cartItems = JSON.parse(localStorage.getItem("cartItems") || []);
  console.log(cartItems);

  let addonArrayFinalResult = cartItems.reduce((acc,item)=>{
    if(item.addons.length>0){
     item.addons.forEach((addon)=>{
      acc.push({
        id:addon.id,
        quantity:addon.quantity,
        cost:addon.cost
      })
     })
    }
    if(item.addoons){
      if(item.addoons.name){
        acc.push({
          id:item.addoons.id,
          cost:item.addoons.cost,
          quantity:item.sizes[0].quantity
        })
      }
    }
    return acc;
  },[])
  let extraArrayFinalResult = cartItems.reduce((acc,item)=>{
    if(item.extras.length>0){
     item.extras.forEach((extras)=>{
      acc.push({
        id:extras.id,
        quantity:extras.quantity,
        cost:extras.cost
      })
     })
    }

    return acc;
  },[])

  let offerArrayFinalResult = cartItems.reduce((acc,item)=>{
    if(item.offers){
      if(item.offers.name){
        acc.push({
          id:item.offers.id,
          cost:item.costOffers,
          quantity:item.sizes[0].quantity
        })
      }
    }
    return acc;
  },[])
  let mealArrayFinalResult = cartItems.reduce((acc,item)=>{
    if(!item.offers && !item.addoons){    
        acc.push({
          id:item.id,
          cost:item.sizes[0].cost,
          quantity:item.sizes[0].quantity,
          size:item.sizes[0].size
        })
    
    }
    return acc;
  },[])
// console.log(mealArrayFinalResult);  
  const handleSubmit =  async(e)=>{
    e.preventDefault();
    Swal.fire({
      title: "",
      text: `Are you sure you want to ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: `Yes,`,
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      // inside i will make all operation to send object of data 
      let customer_id=customeEmailSelectName.customer_id;
      let total_cost=122;
      let tax = 39;
      //  14 % from  total cost i will send 

      let meal_ids=[
        { 
          "id" :6,
          "quantity":1,
          "size":1,
          "cost":2.4,
        }
      ]
     let extra_ids=[
        {
            "id": 1,
            "cost": 1,
            "quantity": 10
        }
    ]  
    
    let objCustum ={}
      objCustum.customer_id=customer_id
      objCustum.total_cost=finalTotalWithDiscount.toFixed(2)
      objCustum.tax= Math.ceil(finalTotalWithDiscount.toFixed(2) * 1.14)
      console.log( objCustum.tax);
      
      if(mealArrayFinalResult.length >0){
        objCustum.meal_ids= mealArrayFinalResult
      }
      if(extraArrayFinalResult.length>0){
        objCustum.extra_ids=extraArrayFinalResult
      }
      if(addonArrayFinalResult.length>0){
        objCustum.addon_ids=addonArrayFinalResult
      }
      if(offerArrayFinalResult.length>0){
        objCustum.offer_ids=offerArrayFinalResult
      }
      console.log(objCustum)
          try {
            const response = await addData("admin/orders/by-admin", objCustum);
            console.log("response", response);
            if (response.status === "success") {
              // localStorage.setItem("cartItems", JSON.stringify([]));
              // setItems([]);
              // updateFinalTotal(localStorage.setItem("cartItems", JSON.stringify([])));
        
              // const event = new Event("storageUpdated");
              // window.dispatchEvent(event);

              setTimeout(() => {
                Swal.fire("Saved!", response.message, "success");
              }, 250);
            }
          } catch (error) {
            // Swal.fire("Error!", error.response?.data?.message, "error");
            Swal.fire("Error!", error);


          }
        } 
  
    );
  }


  return (
    <div className="posCartItems" id="posCartItems">
      <div className="CartItems">
        <div className="closePosCartItems" onClick={toggleCart}>
          <FaXmark />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group gap-3 mb-3">
            <select
              id="dataSelect"
              className="form-select"
              name='customer_id'
              onChange={dataFromSelection}
              requiredparseInt
              value={customeEmailSelectName.customer_id}
            >
              <option value="" disabled selected>choose your email </option>
              {customeEmail.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.email}
                </option>
              ))}
            </select>


            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addPosCustomer"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
            >
              <RiAddCircleLine />
              add
            </button>
          </div>
          {/* select to detect floor or dilevery */}
          <select
            id="dataSelect"
            className="form-select"
            name='floorOrDielivery'
            onChange={dataFromSelection}
            required
            value={customeEmailSelectName.floorOrDielivery}
          >
            <option value="" disabled >choose floor or delivery </option>
            <option key={1} value={"floor"}>     floor  </option>
            <option key={2} value={"dilevery"}>     dilevery  </option>
          </select>
          <div>
            {/* condition to see if dilivery or floor and base on cond we  */}
            {
              customeEmailSelectName.floorOrDielivery === "floor" ?
                <div className="mt-2">
                  <select
                    id="dataSelect"
                    className="form-select "
                    name='DiningTable_id'
                    onChange={dataFromSelection}
                    required
                    value={customeEmailSelectName.DiningTable_id}
                  >
                    <option value="" disabled selected>choose your Dining Table </option>
                    {floorsPlace.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.pleace}
                      </option>
                    ))}
                  </select>
                </div>
                : customeEmailSelectName.floorOrDielivery === "dilevery" ?
                  <div className="mt-3">
                    <div class="form-group">
                      <textarea type="address"required name="address" onChange={dataFromSelection} value={customeEmailSelectName.address} class="form-control" id="exampleInputPassword1" placeholder="address" ></textarea>
                    </div>
                    <div class="form-group">
                      <input type="phone" required name="phone" onChange={dataFromSelection} value={customeEmailSelectName.phone} class="form-control" id="exampleInputPassword1" placeholder="Enter Phone Number" />
                    </div>

                    <div class="form-group">
                      <input type="delivery_fee" required name="delivery_fee" onChange={dataFromSelection} value={customeEmailSelectName.delivery_fee} class="form-control" id="exampleInputPassword1" placeholder="Enter Delivery Fee" />
                    </div>
                  </div>
                  : ''
            }
          </div>



          <div className="table-responsive mt-3">
            <table className="table text-center tableItems">
              <thead>
                <tr>
                  <th>C</th>
                  <th>item</th>
                  <th>qty</th>
                  <th>more</th>
                  <th>price</th>
                </tr>
              </thead>
              <tbody className="bodyCartItems">
                {Object(items).length > 0 ? (
                  items.map((item, index) => (
                    <>
                      {
                        (item.name &&  item.sizes.length > 0) ?
                          <tr key={index} id={item.id}>
                            <td>
                              <FaTrash
                                className="text-danger"
                                onClick={() =>
                                  handleMultiFunction(
                                    "deleteItem",
                                    "Delete Item",
                                    item.id,
                                    index,
                                    "meal"
                                  )
                                }
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>
                              <div className="quantityActions">
                                <AiOutlinePlusCircle
                                  onClick={() => updateQuantity(index, "increase", "meal")}
                                />
                                <input
                                  type="number"
                                  name="quantity"
                                  value={item.sizes[0].quantity}
                                  readOnly
                                />
                                <AiOutlineMinusCircle
                                  onClick={() => updateQuantity(index, "decrease", "meal")}
                                  className={
                                    item.sizes[0].quantity === 1 ? "disabled-icon" : ""
                                  }
                                />
                              </div>
                            </td>
                            {item.addons.length > 0 || item.extras.length > 0 ? (
                              <td>
                                <button
                                  className="detailsItem"
                                // onClick={() => detailsItemToggle(item)}
                                >
                                  <i className="fa-regular fa-square-caret-down"></i>
                                </button>
                              </td>
                            ) : (
                              "--"
                            )}
                            <td>
                              $
                              {item.sizes[0].cost > 0
                                ? (item.sizes[0].cost * item.sizes[0].quantity).toFixed(2)
                                : item.costOffers ? (item.costOffers * item.sizes[0].quantity).toFixed(2) : item.addoons.cost ? (item.addoons.cost * item.sizes[0].quantity).toFixed(2) : ""}
                            </td>
                          </tr>
                          : ""}


                      {/* ------------------------------------------------------------------------------ */}
                      {/* add addons from meals extract */}
                      {(item.addons?.length > 0 || item.extras?.length > 0) &&
                        (
                          item.addons.length > 0 ? item.addons.map((addon, AddonIndex) => {
                            return (
                              <tr key={addon.UniqueId} id={AddonIndex}>
                                <td>
                                  <FaTrash
                                    className="text-danger"
                                    onClick={() =>
                                      handleMultiFunction(
                                        "deleteItem",
                                        "Delete Item",
                                        addon.UniqueId,
                                        addon.UniqueId,
                                        "addon"
                                      )
                                    }
                                  />
                                </td>
                                <td>{addon.name}</td>
                                <td>
                                  <div className="quantityActions">
                                    <AiOutlinePlusCircle
                                      onClick={() => updateQuantity(addon.UniqueId, "increase", "addon")}
                                    />
                                    <input
                                      type="number"
                                      name="quantity"
                                      value={addon.quantity}
                                      readOnly
                                    />
                                    <AiOutlineMinusCircle
                                      onClick={() => updateQuantity(addon.UniqueId, "decrease", "addon")}
                                      className={
                                        addon.quantity === 1 ? "disabled-icon" : ""
                                      }
                                    />
                                  </div>
                                </td>
                                <td>
                                  {"__"
                                  }                    </td>


                                <td>
                                  $
                                  {(addon.cost * addon.quantity).toFixed(2)
                                  }
                                </td>
                              </tr>
                            )
                          }) : "")}


                      {(item.addons?.length > 0 || item.extras?.length > 0) &&
                        (
                          item.extras.length > 0 ? item.extras.map((extra, extraIndex) => {
                            return (
                              <tr key={extra.UniqueId} id={item.id}>
                                <td>
                                  <FaTrash
                                    className="text-danger"
                                    onClick={() =>
                                      handleMultiFunction(
                                        "deleteItem",
                                        "Delete Item",
                                        extra.UniqueId,
                                        extra.UniqueId,
                                        "extra"
                                      )
                                    }
                                  />
                                </td>
                                <td>{extra.name}</td>
                                <td>
                                  <div className="quantityActions">
                                    <AiOutlinePlusCircle
                                      onClick={() => updateQuantity(extra.UniqueId, "increase", "extra")}
                                    />
                                    <input
                                      type="number"
                                      name="quantity"
                                      value={extra.quantity}
                                      readOnly
                                    />
                                    <AiOutlineMinusCircle
                                      onClick={() => updateQuantity(extra.UniqueId, "decrease", "extra")}
                                      className={
                                        extra.quantity === 1 ? "disabled-icon" : ""
                                      }
                                    />
                                  </div>
                                </td>
                                <td>
                                  {"__"
                                  }                    </td>


                                <td>
                                  $
                                  {(extra.cost * extra.quantity).toFixed(2)
                                  }
                                </td>
                              </tr>
                            )
                          }) : "")}



                    </>
                  ))
                )
                  :
                  (
                    <tr>
                      <td className="text-center text-danger" colSpan={5}>
                        no items
                      </td>
                    </tr>

                  )}

              </tbody>
            </table>
          </div>

          <div className="discountType mb-3">
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
            <input
              type="number"
              value={discountValue}
              onClick={() =>
                discountValue === 0 ? setDiscountValue("") : discountValue
              }
              onChange={(e) => setDiscountValue(Number(e.target.value))}
            />
            <button onClick={() => handleApplyDiscount(finalTotal)}>Apply</button>
          </div>

          <ul className="payment-details">
            <li className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">sub total</span>
              <span className="fw-semibold">${finalTotal.toFixed(2)}</span>
            </li>
            <li className="d-flex justify-content-between mb-2">
              <span>discount</span>
              <span>${discountValue === "" ? 0 : discountValue}</span>
            </li>
            <li className="d-flex justify-content-between">
              <span className="fw-bold">total</span>
              <span className="fw-bold">
                ${finalTotalWithDiscount.toFixed(2)}
              </span>
            </li>
          </ul>

          <div className="paymentOption mt-3">
            <button
              className="btn btn-danger"
              onClick={() => handleMultiFunction("resetCart", "Reset Cart")}
            >
              cancel
            </button>
            <button
              className="btn btn-success"
              // onClick={() => handleMultiFunction("makeOrder", "Confirm Order")}
              type="submit"
            >
              order
            </button>
          </div>

          {items.length > 0 ? (
            <div className="invoice" onClick={modalClose}>
              invoice
            </div>
          ) : (
            false
          )}
        </form>
      </div>

    </div>


  );
}
