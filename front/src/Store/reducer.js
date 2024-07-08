
import cloneDeep from 'lodash/cloneDeep'

const getCartData = () => {
    // localStorage.setItem("cartItems", [])

    const currentCart = localStorage.getItem("cartItems")
    if (currentCart == []) {
        return [];
    }
    else {
        return JSON.parse(currentCart);
    }

}

const getCartTotal = () => {
    // localStorage.setItem("cartTotal", 0)

    const currentTotal = localStorage.getItem("cartTotal")
    if (currentTotal == 0) {
        return 0;
    }
    else {
        return JSON.parse(currentTotal);
    }

}


const VALUE = {
    cartTotal: getCartTotal(),
    cartItems: getCartData(),
    searchStatement: "",
    itemQuant: 1


}
export default function cartReducer(
    state = VALUE, action) {
    switch (action.type) {
        case "CHG_CART_TOTAL":
            return {
                ...state,
                cartTotal: state.cartTotal + action.payload
            }

        case "INC_ITEM":
            console.log(action.payload)
            if (action.payload.table_name === "meals") {
                const existingItem = state.cartItems.filter(item => item.name === action.payload.name && item.size === action.payload.size);

                if (existingItem.length !== 0) {
                    
                        return {
                            ...state,
                            cartItems: state.cartItems.map(item =>
                                item.name === action.payload.name && item.size === action.payload.size
                                    ? { ...item, quant: item.quant + 1 }
                                    : item
                            ),
                            cartTotal: state.cartTotal + existingItem[0].cost,
                        };
                    }
                
            } else {
                const existingItem = state.cartItems.find(item => item.name === action.payload.name);
                console.log(existingItem)
                if (existingItem.length !== 0) {
                    
                        // Decrease the item quantity by 1
                        return {
                            ...state,
                            cartItems: state.cartItems.map(item =>
                                item.name === action.payload.name
                                    ? { ...item, quant: item.quant + 1 }
                                    : item
                            ),
                            cartTotal: state.cartTotal + existingItem.cost,
                        };
                    
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))


            return state;
           
       
        case "INC_ITEM_B_CART":


            return {
                ...state,

                itemQuant: state.itemQuant + 1

            }

        case "DEC_ITEM":
            console.log(action.payload)
            if (action.payload.table_name === "meals") {
                const existingItem = state.cartItems.filter(item => item.name === action.payload.name && item.size === action.payload.size);

                if (existingItem.length !== 0) {
                    if (existingItem[0].quant === 1) {
                        
                        console.log(state.cartItems)
                        return {
                            ...state,
                            cartItems: state.cartItems.filter((item) => (item !== existingItem[0])),
                            cartTotal: state.cartTotal - existingItem[0].cost,
                        };
                    } else {
                        // Decrease the item quantity by 1
                        return {
                            ...state,
                            cartItems: state.cartItems.map(item =>
                                item.name === action.payload.name && item.size === action.payload.size
                                    ? { ...item, quant: item.quant - 1 }
                                    : item
                            ),
                            cartTotal: state.cartTotal - existingItem[0].cost,
                        };
                    }
                }
            } else {
                const existingItem = state.cartItems.find(item => item.name === action.payload.name);
                console.log(existingItem)
                if (existingItem.length !== 0) {
                    if (existingItem.quant === 1) {
                        // Remove the item from the cart if quantity is 1
                        return {
                            ...state,
                            cartItems: state.cartItems.filter(item => item.name !== action.payload.name),
                            cartTotal: state.cartTotal - existingItem.cost,
                        };
                    } else {
                        // Decrease the item quantity by 1
                        return {
                            ...state,
                            cartItems: state.cartItems.map(item =>
                                item.name === action.payload.name
                                    ? { ...item, quant: item.quant - 1 }
                                    : item
                            ),
                            cartTotal: state.cartTotal - existingItem.cost,
                        };
                    }
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))


            // Default return if no changes were made
            return state;
       
      

        case "DEC_ITEM_B_CART":
            if (state.itemQuant > 0) {
                return {
                    ...state,
                    itemQuant: state.itemQuant - 1
                }
            }

        case "ZERO_QUANT":
            return {
                ...state,
                itemQuant: 1
            }

        case "ADD_TO_CART":

            let payload = cloneDeep(action.payload)

            if (payload[0].table_name === "meals") {
                console.log(payload[0].table_name)
                let sizeEx = state.cartItems.filter((item) => (item.size === payload[0].size));
                if (sizeEx.length !== 0) {
                    let nameEx = sizeEx.filter((item) => (item.name === payload[0].name))
                    if (nameEx.length !== 0) {

                        state.cartItems.find((item) => (item === nameEx[0])).quant += payload[1]
                        state.cartTotal = state.cartTotal + nameEx[0].cost * payload[1]
                    }
                    else {
                        payload[0].quant = payload[1]
                        state.cartItems.push(payload[0])
                        state.cartTotal = state.cartTotal + payload[0].cost * payload[1]

                    }
                }
                else {
                    payload[0].quant = payload[1]
                    state.cartItems.push(payload[0])
                    state.cartTotal = state.cartTotal + payload[0].cost * payload[1]
                }
            }
            else {
                let nameEx = state.cartItems.filter((item) => (item.name === payload[0].name))
                if (nameEx.length !== 0) {
                    state.cartItems.find(item => (item.name === payload[0].name)).quant += payload[0].quant
                    state.cartTotal = state.cartTotal + payload[0].cost * payload[1]
                }
                else {
                    payload[0].quant = payload[1]
                    state.cartItems.push(payload[0])
                    state.cartTotal = state.cartTotal + payload[0].cost * payload[1]
                }

            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

            return {
                ...state,
                cartItems: state.cartItems
            }


        case "SEARCH":
            state.searchStatement = action.payload
            return {
                ...state,
                searchStatement: state.searchStatement

            }
            case "EMP_CART":
                state.cartItems = []
                state.cartTotal=0
                return {
                    ...state,
                    cartItems: state.cartItems,
                    cartTotal: state.cartTotal
    
                }
            
     

        default:
            return state
    }

}


