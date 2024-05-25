const VALUE={
    cartTotal:500,
    cartItems:[{'title':'tot bag','price':200,'image':'https://m.media-amazon.com/images/I/81gt+tL77NL._AC_UF894,1000_QL80_.jpg','quant':1},{'title':'hand bag','price':300,'image':'https://www.charleskeith.eu/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-ck-products/default/dwbe20beb1/images/hi-res/2021-L3-CK2-30781483-51-1.jpg?sw=756&sh=1008','quant':1}],
    
}
export default function cartReducer(
    state= VALUE, action){
        switch(action.type){
            case "CHG_CART_TOTAL":
                return{
                    ...state,
                    cartTotal:state.cartTotal+action.payload
                }
            
                case "INC_ITEM":
                    return{
                        ...state,
                        cartItems: state.cartItems.map(product =>
                          product.title === action.payload
                            ? { ...product, quant: product.quant + 1 }
                            : product
                        )

                    } 
                    case "DEC_ITEM": 
                        if(state.cartItems.find((item)=>(item.title===action.payload)).quant==1){
                            return{
                            ...state,

                            cartItems:state.cartItems.filter((item)=>(item.title!==action.payload))
                            }

                        }
                        else{
                            return{
                            ...state,
                            cartItems: state.cartItems.map(product =>
                              product.title === action.payload
                                ? { ...product, quant: product.quant - 1 }
                                : product
                            )
                        }
                        }
                        
                
                                                             
            default:
                return state
        }
        
    }

    