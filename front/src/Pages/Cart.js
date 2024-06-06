import { useDispatch, useSelector } from "react-redux"
import CheckOutCard from "../Componenets/CheckOutCard"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { useState } from "react";

export default function Cart() {
    const [formData, setFormData] = useState({
        
        email: '',
        password: ''
      });
      const [errors, setErrors] = useState({
        emailError: "",
        passError: "",
    })
    
      const handleInputChange = (event) => {
      
        if (event.target.name === "email") {
            setFormData({
                ...formData,
                email: event.target.value
            })
            setErrors({
                ...errors,
                emailError: event.target.value.length === 0 ? "This Field is required" : !event.target.validity.valid && "Please enter a vaild email"
            })
        }

        else if (event.target.name === "password") {
            setFormData({
                ...formData,
                password: event.target.value
            })
            setErrors({
                ...errors,
                passError: event.target.value.length === 0 ? "This Field is required" : !event.target.validity.valid && "Please enter a vaild password"
            })
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };
    const cartItems = useSelector((state) => state.cartItems)

    const [paymentData, setPaymentData] = useState({
        items: cartItems,
        method: ''
    });
    function inputChg(event) {
        // setPaymentData({ items: cartItems })
        setPaymentData({ ...paymentData, method: event.target.value })
        console.log(cartItems)

    }
    function checkOut(e) {
        e.preventDefault()
        // setPaymentData({ ...paymentData, items:cartItems})

        console.log(paymentData)


    }

    const cartTotal = useSelector((state) => state.cartTotal)
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
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value="cash"
                                    name="payment"
                                    id="cash"
                                    onChange={inputChg}
                                    checked={paymentData.method === 'cash'}
                                />
                                <label className="form-check-label" for="cash">
                                    Cash/Card
                                </label>
                            </div>
                            <div className="form-check pb-3">
                                <input className="form-check-input" type="radio" value="dpay" name="payment" id="dpay" onChange={inputChg} checked={paymentData.method === 'dpay'} />
                                <label className="form-check-label" for="dpay">
                                    Digital payment
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary rounded-pill col-6" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => checkOut(e)}>Place order</button>

                            {/* Log in Modal */}
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Please log in first!</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">


                                            {/* Form */}
                                            <form onSubmit={handleSubmit}>
                                                

                                                <div>
                                                    <label for="email" className="form-label">Email:</label>
                                                    <br></br>
                                                    <span  className="text-danger">{errors.emailError}</span>
                                                    <input
                                                        className="form-control" 
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onBlur={handleInputChange}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>

                                                <div>
                                                    <label for="password" className="form-label">Password:</label>
                                                    <br></br>
                                                    <span className="text-danger">{errors.passError}</span>

                                                    <input
                                                    className="form-control" 
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                        value={formData.password}
                                                        onBlur={handleInputChange}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <Link to="/register"> <p data-bs-dismiss="modal">Register</p> </Link>

                                                
                                                <div class="modal-footer mt-3">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                            <button className="btn btn-primary " onClick={handleSubmit} type="button" disabled={errors.emailError ||  errors.passError || 
                              formData.password === '' || formData.email === ''}>Log in</button>

                                        </div>
                                            </form>
                                            {/* Form */}
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            {/* End log in Modal */}
                        </form>
                    </div>
                </div>


                <div className="col-4 text-center">
                    <strong><p>Cart Summary</p></strong>
                    {cartItems.map((item) => (
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