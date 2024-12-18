import { useState } from "react";
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import axios from "axios";
import { useHistory } from "react-router-dom";
import { settings } from "../Store/action";

export function Login(props){
    const [signed, setSigned] = useState(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const dispatch = useDispatch();

    const [token, setToken] = useState(null)
    let history = useHistory();

    const [formData, setFormData] = useState({

        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        emailError: "",
        passError: "",
        loginError: ""
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


        setSigned(0)

        console.log(token);

        try {
            const response = await axios.post(props.loginEP, formData);
            setIsLoggedIn(true)
            setToken(response.access_token)
            localStorage.setItem(props.tokenName, JSON.stringify(token));
            history.push(props.redirect);
            console.log(response);
            let points=response.data.customer.loyalty_points;

            setErrors({
                ...errors,
                loginError: ""
            })


            localStorage.setItem(props.tokenName, JSON.stringify(response.data.access_token));
            setToken(JSON.parse(localStorage.getItem(props.tokenName)));



            console.log('Form submitted successfully:', response.data);
            if (props.customer=='true'){
                try{

                    const getInfo = await axios.get("http://127.0.0.1:8000/api/loyalty-settings", {
                        headers: {
                          Authorization: `Bearer ${JSON.parse(token)}`,
                          "Content-Type": "multipart/form-data",
                        },
                      });
                    console.log(getInfo);
                    dispatch(settings(
                        {
                        points_num:points,
                        max_points_num:getInfo.data.data.loyalty_max_redeem_points,
                        min_points_num:getInfo.data.data.loyalty_min_redeem_points,
                        max_discount:getInfo.data.data.loyalty_max_discount_rate,
                        currency_per_point:getInfo.data.data.currency_per_point,
                        min_order_price:getInfo.data.data.min_order_price_for_points,
                        points_for_one_currency:getInfo.data.data.price_per_point
                    }
                    ))
                    var info=getInfo.data.data;
                    info.points_num=points;
                    localStorage.setItem("Loyality_points_info", JSON.stringify(info))

                    
                }catch(error){

                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
         
            setErrors({
                ...errors,
                loginError: "invalid email or password"
            })
        }


    };

    const resetPassword = async (e) => {
        history.push({
            pathname: '/customer/emailtoresetpassword',
            state: { data: props.fpEndpoint }
          });
       
        e.preventDefault()
     

    }
    return(<>
    <div className="w-50 color-dark admin-login mx-auto my-5  text-center">
        <h2 className="LoginWelcome">
            Welcome Back
        </h2>
    <form className="mx-auto w-75 pb-5"  onSubmit={handleSubmit}>
        


<div>
    <span className="text-danger">{errors.loginError}</span>
    

    <label for="email" className="form-label justify-content-center">Email:</label>
    
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
    <label for="password" className="form-label mt-3 justify-content-center">Password:</label>
    

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
<br></br>
{/* <Link to="/register"> <p data-bs-dismiss="modal">Register</p> </Link> */}
{
    props.customer==="true" ?
    <Link to="/customer/register">
    <p >Register</p>
</Link>
    :<></>
}

<div className=" text-center pb-2">
    <a href="" className="pb-3 pl-1" onClick={resetPassword}><p>Forgot password</p></a>
    {/* <span className={"text-danger ml-5 " + (requestedToReset ? "visible" : "invisible")}>Check your email</span> */}
</div>



    {/* ||  errors.passError */}
    <button
        className="btn btn-dark rounded-pill m-auto"

        onClick={handleSubmit}
        type="button"
        disabled={errors.emailError || formData.password === '' || formData.email === ''}
    >
        Log in
    </button>

</form>
</div>
    </>)
}