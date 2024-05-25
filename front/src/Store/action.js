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
