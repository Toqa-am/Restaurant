import { useSelector } from "react-redux"
import CheckOutCard from "../Componenets/CheckOutCard"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

export default function Cart() {
    const cartItems=useSelector((state)=>state.cartItems)
    const cartTotal=useSelector((state)=>state.cartTotal)
    return (
        <>
        <div className="d-flex justify-content-around container pt-5">
            <div className="col-6">
                <Link to="/" > <i className="fa-solid fa-backward pb-3"></i> Back to Home</Link>
                <div className="col-6">
                    <strong><p>Table</p></strong>
                     <hr className="col-12"></hr>
                    <p>Inside Table-2</p>
                </div>
                <div className="col-10 ">
                    <strong><p>Payment</p></strong>
                    <hr className="col-12"></hr>
                    <form>
                    <div className="form-check pb-3">
                    <input className="form-check-input" type="radio" name="payment" id="cash" checked/>
                    <label className="form-check-label" for="cash">
                        Cash/Crd
                    </label>
                    </div>
                    <div className="form-check pb-3">
                    <input className="form-check-input" type="radio" name="payment" id="dpay" />
                    <label className="form-check-label" for="dpay">
                        Digital payment
                    </label>
                    </div>
                    <button type="submit" className="btn btn-primary rounded-pill col-6">Place order</button>
                    </form>
                </div>
            </div>


            <div className="col-4 text-center">
                <strong><p>Cart Summary</p></strong>
            {cartItems.map((item)=>(
                <CheckOutCard img={item.image_url} title={item.pokemon}
                price={item.hitpoints}
                quant={item.quant}
                desc={item.type} />
            ))}
            <div className="border rounded p-2">
                <div className="d-flex justify-content-around">
                <sapn>
                    Suptotal
                </sapn>
                <sapn>
                    {cartTotal}
                </sapn>


                </div>
                <hr></hr>

                <div className="d-flex justify-content-around">
                <sapn>
                    Total
                </sapn>
                <sapn>
                    {cartTotal}
                </sapn>
                

                </div>
                

            </div>
            </div>

            

            </div>
        </>
    )
}