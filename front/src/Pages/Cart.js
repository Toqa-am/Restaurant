import { useDispatch, useSelector } from "react-redux"
import CheckOutCard from "../Componenets/CheckOutCard"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contextes/AuthContext";
import useAuth from "../contextes/CustomHook";

export default function Cart() {
    const [signed, setSigned] = useState(0)
    // const { setCurrentUser } = useContext(AuthContext);
    // const { isLoggedIn, login, logout } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [accessToken, setAccessToken] = useState(null)


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

    const handleSubmit = async (e) => {
        e.preventDefault();


        //  accessToken =  JSON.parse(localStorage.getItem('accessToken'));
        // if (accessToken === '') {
        setSigned(0)

        console.log(accessToken);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', formData);
            setIsLoggedIn(true)


            localStorage.setItem('accessToken', JSON.stringify(response.data.access_token));
            setAccessToken(JSON.parse(localStorage.getItem('accessToken')));


            // sessionStorage.setItem('accessToken', accessToken);
            // setCurrentUser(response.data.customer);
            console.log(response.data.customer);

            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        // }
        // else {
        //     setSigned(1)

        //     console.log("jkgghdcg"+signed);
        // }
        // console.log(response.data.access_token + "//////////////");

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
        setAccessToken(JSON.parse(localStorage.getItem('accessToken')));
        console.log(JSON.parse(localStorage.getItem('accessToken')) + "loooggg/////////");
        if (accessToken !== null) {
            setIsLoggedIn(true)
            console.log(isLoggedIn)
        }
        else if (accessToken === null) {
            setIsLoggedIn(false)
            console.log(isLoggedIn)

        }


    }

    const cartTotal = useSelector((state) => state.cartTotal)
    return (
        <>
            <div className="d-flex justify-content-around container pt-5 flex-wrap">
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
                           
                         
                            <button
                                type="submit"
                                className="btn btn-primary rounded-pill col-6"
                                data-bs-toggle={isLoggedIn ? "" : "modal"}
                                data-bs-target={(isLoggedIn ? "" : "#loginModal")}
                                onClick={(e) => {
                                    checkOut(e);
                                    if (isLoggedIn) {
                                        window.alert("Done");
                                    }
                                }}
                            >
                                Place order
                            </button>

                            {/* } */}
                            <div className={"alert alert-info mt-3 " + (isLoggedIn ? "visible" : "invisible")} role="alert">
                                Your order has been placed
                            </div>

                            {/* Log in Modal */}
                            <div className="modal fade h-75" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="false">
                                <div class="modal-dialog">
                                    <div class="modal-content ">
                                        {/* <div className={" text-center "+(signed? "visible":"invisible")}>
                                            <h2>Welcome</h2>
                                            <h4>please Wait patiently for your order!</h4>
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">close</button>

                                        </div> */}
                                        <div className="">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="loginModalLabel">Please log in first!</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">


                                                {/* Form */}
                                                <form onSubmit={handleSubmit}>


                                                    <div>
                                                        <label for="email" className="form-label">Email:</label>
                                                        <br></br>
                                                        <span className="text-danger">{errors.emailError}</span>
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
                                                        {/* ||  errors.passError */}
                                                        <button className="btn btn-primary " data-bs-dismiss="modal" onClick={handleSubmit} type="button" disabled={errors.emailError ||
                                                            formData.password === '' || formData.email === ''}>Log in</button>

                                                    </div>
                                                </form>
                                                {/* Form */}
                                            </div>
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
                        <CheckOutCard img={item.image} title={item.name}
                            price={item.cost}
                            quant={item.quant}
                            desc={item.description} />
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