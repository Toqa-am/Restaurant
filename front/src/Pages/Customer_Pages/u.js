<div className="d-flex justify-content-around container pt-5 flex-wrap">
<div className="col-6">
    <Link to="/customer/menu" > <i className="fa-solid fa-backward pb-3"></i> Back to Home</Link>
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

{/* {accessToken ?
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
            :
            <button
                type="submit"
                className="btn btn-primary rounded-pill col-6"

                onClick={(e) => {
                    checkOut(e);
                    if (isLoggedIn) {
                        window.alert("Done");
                    }
                }}
            >
                Place order
            </button>
} */}
<button
type="submit"
className="btn btn-primary rounded-pill col-6"
data-bs-toggle={accessToken ? "" : "modal"}
data-bs-target={accessToken ? "" : "#loginModal"}
onClick={(e) => {
checkOut(e);
if (accessToken) {
window.alert("Done");
}
}}
>
Place order
</button>
            {/* <button
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
            </button> */}

            {/* } */}
            <div className={"alert alert-info mt-3 " + (isLoggedIn ? "visible" : "invisible")} role="alert">
                Your order has been placed
            </div>

            {/* Log in Modal */}
            <div className="modal fade h-75" ref={modalRef} id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
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
                                        <span className="text-danger">{errors.loginError}</span>
                                        <br></br>

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
                                    <Link to="/customer/register"> <p data-bs-dismiss="modal">Register</p> </Link>
                                    <div className="d-flex ">
                                        <a href="" className="pr-5" onClick={resetPassword}><p>Forgot password</p></a>
                                        <span className={"text-danger " + (requestedToReset ? "visible" : "invisible")}>Check your email</span>
                                    </div>



                                    <div class="modal-footer mt-3">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                        {/* ||  errors.passError */}
                                        <button
                                            className="btn btn-primary"

                                            onClick={handleSubmit}
                                            type="button"
                                            disabled={errors.emailError || formData.password === '' || formData.email === ''}
                                        >
                                            Log in
                                        </button>
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
        <CheckOutCard img={item.image} title={`${typeof item.size==="undefined"?"":item.size +"-"} ${item.name}`}
       
        price={item.cost}    quant={item.quant}
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