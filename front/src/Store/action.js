export const changeCartTotal=(payload)=>{
    return{
        type:"CHG_CART_TOTAL",
        payload:payload
    }
}

export const increaseItemQuant=(payload)=>{
    return{
        type:"INC_ITEM",
        payload:payload
    }
}

export const decreaseItemQuant=(payload)=>{
    return{
        type:"DEC_ITEM",
        payload:payload
    }
}

export const addToCart = (pokemon) => {
  return {
    type: 'ADD_TO_CART',
    payload: pokemon
  };
};

export const search = (payload) => {
    return {
      type: 'SEARCH',
      payload: payload
    };
  };


