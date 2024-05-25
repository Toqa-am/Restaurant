

const VALUE = {
    cartTotal: 0,
    cartItems: [],
    searchStatement:""
    

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
            return {
                ...state,
                cartItems: state.cartItems.map(product =>
                    product.id === action.payload
                        ? { ...product, quant: product.quant + 1 }
                        : product
                )

            }
        case "DEC_ITEM":
            if (state.cartItems.find((item) => (item.id === action.payload)).quant == 1) {
                return {
                    ...state,

                    cartItems: state.cartItems.filter((item) => (item.id !== action.payload))
                }

            }
            else {
                return {
                    ...state,
                    cartItems: state.cartItems.map(product =>
                        product.id === action.payload
                            ? { ...product, quant: product.quant - 1 }
                            : product
                    )
                }
            }


            case "ADD_TO_CART":
                if(state.cartItems.filter((item)=>(item.id===action.payload.id)).length===0){
                    action.payload.quant=1
                    state.cartTotal+=action.payload.hitpoints
                    state.cartItems.push(action.payload)

                }
                
                console.log(state.cartItems);
                return {
                  ...state,
                  cartItems: state.cartItems
                };

                case "SEARCH":
                    state.searchStatement=action.payload
                    return {
                        ...state,
                        searchStatement:state.searchStatement
        
                    }
              
            
        default:
            return state
    }

}


