import cloneDeep from "lodash/cloneDeep";
const getCartData = () => {
  let currentCart = localStorage.getItem("customerCartItems");
  if (currentCart && currentCart == []) {
    return [];
  } else if (!currentCart) {
    currentCart = [];
    localStorage.setItem("customerCartItems", JSON.stringify(currentCart));
    return JSON.parse(currentCart);
  } else {
    return JSON.parse(currentCart);
  }
};

const getCartTotal = () => {
  let currentTotal = localStorage.getItem("cartTotal");
  if (currentTotal == 0) {
    return 0;
  } else if (!currentTotal) {
    currentTotal = 0;
    localStorage.setItem("cartTotal", JSON.stringify(currentTotal));
    return JSON.parse(currentTotal);
  } else {
    return JSON.parse(currentTotal);
  }
};
const getLotalityInfo = () => {
  let currentInfo = localStorage.getItem("Loyality_points_info");
  if (currentInfo && currentInfo == {}) {
    return [];
  } else if (!currentInfo) {
    currentInfo = {};
    localStorage.setItem("Loyality_points_info", JSON.stringify(currentInfo));
    return JSON.parse(currentInfo);
  } else {
    return JSON.parse(currentInfo);
  }
};
const VALUE = {
  cartTotal: getCartTotal(),
  customerCartItems: getCartData(),
  searchStatement: "",
  itemQuant: 1,
  table_num: null,
  table_id: null,
  points_num: getLotalityInfo().points_num,
  max_points_num: getLotalityInfo().loyalty_max_redeem_points,
  min_points_num: getLotalityInfo().loyalty_min_redeem_points,
  max_discount: getLotalityInfo().loyalty_max_discount_rate,
  currency_per_point: getLotalityInfo().currency_per_point,
  min_order_price: getLotalityInfo().min_order_price_for_points,
  points_for_one_currency: getLotalityInfo().price_per_point,
  tax: 0,
};
export default function cartReducer(state = VALUE, action) {
  switch (action.type) {
    case "CHG_CART_TOTAL":
      return {
        ...state,
        cartTotal: state.cartTotal + action.payload,
      };

    case "INC_ITEM":
      // console.log(action.payload)
      if (action.payload.table_name === "meals") {
        const existingItem = state.customerCartItems.filter(
          (item) =>
            item.name === action.payload.name &&
            item.size === action.payload.size
        );

        if (existingItem.length !== 0) {
          return {
            ...state,
            customerCartItems: state.customerCartItems.map((item) =>
              item.name === action.payload.name &&
              item.size === action.payload.size
                ? { ...item, quant: item.quant + 1 }
                : item
            ),
            cartTotal: Number(
              Number(state.cartTotal + existingItem[0].cost).toFixed(2)
            ),
          };
        }
      } else if (action.payload.table_name === "offers") {
        const existingItem = state.customerCartItems.find(
          (item) => item.name === action.payload.name
        );
        // console.log(existingItem)
        if (existingItem.length !== 0) {
          return {
            ...state,
            customerCartItems: state.customerCartItems.map((item) =>
              item.name === action.payload.name
                ? { ...item, quant: item.quant + 1 }
                : item
            ),
            cartTotal: Number(
              Number(
                state.cartTotal + existingItem.total_price_after_discount
              ).toFixed(2)
            ),
          };
        }
      } else {
        const existingItem = state.customerCartItems.find(
          (item) => item.name === action.payload.name
        );
        // console.log(existingItem)
        if (existingItem.length !== 0) {
          return {
            ...state,
            customerCartItems: state.customerCartItems.map((item) =>
              item.name === action.payload.name
                ? { ...item, quant: item.quant + 1 }
                : item
            ),
            cartTotal: Number(
              Number(state.cartTotal + existingItem.cost).toFixed(2)
            ),
          };
        }
      }
      localStorage.setItem(
        "customerCartItems",
        JSON.stringify(state.customerCartItems)
      );

      return state;

    case "INC_ITEM_B_CART":
      return {
        ...state,

        itemQuant: state.itemQuant + 1,
      };

    case "DEC_ITEM":
      // console.log(action.payload)
      if (action.payload.table_name === "meals") {
        const existingItem = state.customerCartItems.filter(
          (item) =>
            item.name === action.payload.name &&
            item.size === action.payload.size
        );

        if (existingItem.length !== 0) {
          if (existingItem[0].quant === 1) {
            // console.log(state.customerCartItems)
            return {
              ...state,
              customerCartItems: state.customerCartItems.filter(
                (item) => item !== existingItem[0]
              ),
              cartTotal: Number(
                (state.cartTotal - existingItem[0].cost).toFixed(2)
              ),
            };
          } else {
            // Decrease the item quantity by 1
            return {
              ...state,
              customerCartItems: state.customerCartItems.map((item) =>
                item.name === action.payload.name &&
                item.size === action.payload.size
                  ? { ...item, quant: item.quant - 1 }
                  : item
              ),
              cartTotal: Number(
                (state.cartTotal - existingItem[0].cost).toFixed(2)
              ),
            };
          }
        }
      } else if (action.payload.table_name === "offers") {
        const existingItem = state.customerCartItems.find(
          (item) => item.name === action.payload.name
        );
        // console.log(existingItem)
        if (existingItem.length !== 0) {
          if (existingItem.quant === 1) {
            // Remove the item from the cart if quantity is 1
            return {
              ...state,
              customerCartItems: state.customerCartItems.filter(
                (item) => item.name !== action.payload.name
              ),
              cartTotal: Number(
                (
                  state.cartTotal - existingItem.total_price_after_discount
                ).toFixed(2)
              ),
            };
          } else {
            // Decrease the item quantity by 1
            return {
              ...state,
              customerCartItems: state.customerCartItems.map((item) =>
                item.name === action.payload.name
                  ? { ...item, quant: item.quant - 1 }
                  : item
              ),
              cartTotal: Number(
                (
                  state.cartTotal - existingItem.total_price_after_discount
                ).toFixed(2)
              ),
            };
          }
        }
      } else {
        const existingItem = state.customerCartItems.find(
          (item) => item.name === action.payload.name
        );
        // console.log(existingItem)
        if (existingItem.length !== 0) {
          if (existingItem.quant === 1) {
            // Remove the item from the cart if quantity is 1
            return {
              ...state,
              customerCartItems: state.customerCartItems.filter(
                (item) => item.name !== action.payload.name
              ),
              cartTotal: Number(
                (state.cartTotal - existingItem.cost).toFixed(2)
              ),
            };
          } else {
            // Decrease the item quantity by 1
            return {
              ...state,
              customerCartItems: state.customerCartItems.map((item) =>
                item.name === action.payload.name
                  ? { ...item, quant: item.quant - 1 }
                  : item
              ),
              cartTotal: Number(
                (state.cartTotal - existingItem.cost).toFixed(2)
              ),
            };
          }
        }
      }
      localStorage.setItem(
        "customerCartItems",
        JSON.stringify(state.customerCartItems)
      );

      // Default return if no changes were made
      return state;

    case "DEC_ITEM_B_CART":
      if (state.itemQuant > 1) {
        return {
          ...state,
          itemQuant: state.itemQuant - 1,
        };
      }

    case "ZERO_QUANT":
      return {
        ...state,
        itemQuant: 1,
      };

    case "ADD_TO_CART":
      let payload = cloneDeep(action.payload);

      if (payload[0].table_name === "meals") {
        // console.log(payload[0].table_name)
        let sizeEx = state.customerCartItems.filter(
          (item) => item.size === payload[0].size
        );
        if (sizeEx.length !== 0) {
          let nameEx = sizeEx.filter((item) => item.name === payload[0].name);
          if (nameEx.length !== 0) {
            state.customerCartItems.find((item) => item === nameEx[0]).quant +=
              payload[1];
            state.cartTotal = Number(
              Number(state.cartTotal + nameEx[0].cost * payload[1]).toFixed(2)
            );
          } else {
            payload[0].quant = payload[1];
            state.customerCartItems.push(payload[0]);
            state.cartTotal = Number(
              Number(state.cartTotal + payload[0].cost * payload[1]).toFixed(2)
            );
          }
        } else {
          payload[0].quant = payload[1];
          state.customerCartItems.push(payload[0]);
          state.cartTotal = Number(
            Number(state.cartTotal + payload[0].cost * payload[1]).toFixed(2)
          );
        }
      } else if (payload[0].table_name === "offers") {
        let nameEx = state.customerCartItems.filter(
          (item) => item.name === payload[0].name
        );
        if (nameEx.length !== 0) {
          state.customerCartItems.find(
            (item) => item.name === payload[0].name
          ).quant += payload[1];
          state.cartTotal = Number(
            Number(
              state.cartTotal +
                payload[0].total_price_after_discount * payload[1]
            ).toFixed(2)
          );
        } else {
          payload[0].quant = payload[1];
          state.customerCartItems.push(payload[0]);
          state.cartTotal = Number(
            Number(
              state.cartTotal +
                payload[0].total_price_after_discount * payload[1]
            ).toFixed(2)
          );
        }
      } else {
        let nameEx = state.customerCartItems.filter(
          (item) => item.name === payload[0].name
        );
        if (nameEx.length !== 0) {
          state.customerCartItems.find(
            (item) => item.name === payload[0].name
          ).quant += payload[1];
          state.cartTotal = Number(
            Number(state.cartTotal + payload[0].cost * payload[1]).toFixed(2)
          );
        } else {
          payload[0].quant = payload[1];
          state.customerCartItems.push(payload[0]);
          state.cartTotal = Number(
            Number(state.cartTotal + payload[0].cost * payload[1]).toFixed(2)
          );
        }
      }
      localStorage.setItem(
        "customerCartItems",
        JSON.stringify(state.customerCartItems)
      );

      return {
        ...state,
        customerCartItems: state.customerCartItems,
      };

    case "SEARCH":
      state.searchStatement = action.payload;
      return {
        ...state,
        searchStatement: state.searchStatement,
      };
    case "EMP_CART":
      state.customerCartItems = [];
      state.cartTotal = 0;
      return {
        ...state,
        customerCartItems: state.customerCartItems,
        cartTotal: state.cartTotal,
      };
    case "SET_TABLE":
      state.table_id = action.payload[0];
      state.table_num = action.payload[1];
      return {
        ...state,
        table_id: state.table_id,
        table_num: state.table_num,
      };
    case "UPDATE":
      state.updated = action.payload;
      return {
        ...state,
        updated: state.updated,
      };
    case "LOYALITY_POINTS_SETTINGS":
      // console.log("Action payload:", action.payload); // This should log the payload
      return {
        ...state, // Spread the current state
        points_num: action.payload.points_num,
        max_points_num: action.payload.max_points_num,
        min_points_num: action.payload.min_points_num,
        max_discount: action.payload.max_discount,
        currency_per_point: action.payload.currency_per_point,
        min_order_price: action.payload.min_order_price,
        points_for_one_currency: action.payload.points_for_one_currency,
      };
    case "UPDATE_LOYALITY_POINTS":
      // Retrieve the data from localStorage and parse it into an object
      let newInfo = localStorage.getItem("Loyality_points_info");
      if (newInfo) {
        newInfo = JSON.parse(newInfo); // Parse the string into an object
        newInfo.points_num = action.payload; // Update the points number
        localStorage.setItem("Loyality_points_info", JSON.stringify(newInfo)); // Save the updated object
        // console.log("Updated LocalStorage:", newInfo);
      } else {
        console.warn(
          "No data found in LocalStorage for 'Loyality_points_info'"
        );
      }

      // Update the state
      return {
        ...state, // Spread the current state
        points_num: action.payload, // Update the specific property
      };

    default:
      return state;
  }
}
