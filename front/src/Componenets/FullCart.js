import { useDispatch, useSelector } from "react-redux";
import { CartCard } from "./CartCard";
import { increaseItemQuant , decreaseItemQuant, changeCartTotal} from "../Store/action";
import { useEffect, useState } from "react";


export default function FullCart(){
    const cart=useSelector((state)=>state.cartItems)
    const[quants,setQuants]=useState([])

    const dispatcher=useDispatch()

    useEffect(() => {
        setQuants(cart)

      }, [cart]);

    function increaseItems(item){
        dispatcher(increaseItemQuant(item.title))
        dispatcher(changeCartTotal(item.price))
        return item
    }
    function decreaseItems(item){
        dispatcher(decreaseItemQuant(item.title))
        dispatcher(changeCartTotal(-item.price))

    }
    return(
        <>
        {cart.map((item, index) => (
            <CartCard
                key={index}
                src={item.image}
                title={item.title}
                price={item.price}
                quant={item.quant}
                increase={()=>increaseItems(item)}
                decrease={()=>decreaseItems(item)}
            />
))}
        </>
    )
}
