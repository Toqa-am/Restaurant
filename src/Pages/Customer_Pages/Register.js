import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import { Navbar } from '../../Components/Customer/Navbar';


export function Register() {
    const [registered,setRegistered]=useState(0)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone:"",
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({
        nameError: "",
        emailError: "",
        passError: "",
        phoneError:"",
        cpassError: ""
    })

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        if (event.target.name === "name") {
            setFormData({
                ...formData,
                name: event.target.value
            })
            setErrors({
                ...errors,
                nameError: event.target.value.length === 0 ? "This Field Is Required" : event.target.value.length < 3 && "Please Insert a Valid Name,not less that 3 letters"
            })

        } else if (event.target.name === "email") {
            setFormData({
                ...formData,
                email: event.target.value
            })
            setErrors({
                ...errors,
                emailError: event.target.value.length === 0 ? "This Field is required" : !event.target.validity.valid && "Please enter a vaild email"
            })
        }
        else if (event.target.name === "phone") {
            setFormData({
                ...formData,
                phone: event.target.value
            })
            setErrors({
                ...errors,
                phoneError: event.target.value.length === 0 ? "This Field is required" : !event.target.validity.valid && "Please enter a vaild phone Number"
            })
        }

        else if (event.target.name === "password") {
            setFormData({
                ...formData,
                password: event.target.value
            })
            setErrors({
                ...errors,
                passError: event.target.value.length === 0 ? "This Field is required" : event.target.value.length < 8 && "Password should be at least 8 digits"
                // !event.target.validity.valid && "Please enter a vaild password"
            })
        }
        else if (event.target.name === "password_confirmation") {
            setFormData({
                ...formData,
                password_confirmation: event.target.value
            })
            setErrors({
                ...errors,
                cpassError: event.target.value.length === 0 ? "This Field is required" : event.target.value !== formData.password && "Password and re-type should match"
            })
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/register', formData);
   
            setRegistered(1)
            Swal.fire({
                title: "Done",
                text: " Please verify your E-mail, after verification you can continue to checkOut page",
                icon: "info"
              })
            
        } catch (error) {
            if (error.response.data.message =="The email has already been taken."){
                Swal.fire({
                    title: "Error",
                    text: "This E-mail is already registered",
                    icon: "error"
                  })
            }
            else{
                Swal.fire({
                    title: "Error",
                    text: "Error",
                    icon: "error"
                  })
            }
            console.error('Error submitting form:', error);
            setRegistered(0)
        }
    };

    return (
        <div className="main-container">
        <Navbar />
        <div className='bg-light '>
        <div className="container text-center w-50 border border-dark-subtle my-5">
            <h4 className='my-3'>Please, fill your information</h4>

            <form className="text-center">
                <div>
                    <label for="name" className="justify-content-center">Name:</label>
                    
                    <span className="text-danger">{errors.nameError}</span>

                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onBlur={handleInputChange}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <br></br>
                <div>
                    <label for="email" className="justify-content-center">Email:</label>
                    
                    <span className="text-danger">{errors.emailError}</span>

                    <input
                        className="form-control"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onBlur={handleInputChange}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <br></br>
                <div>
                    <label for="phone" className="justify-content-center">phone:</label>
                    
                    <span className="text-danger">{errors.phoneError}</span>

                    <input
                        className="form-control"
                        type="text"
                        id="phone"
                        name="phone"
                        pattern="^[0-9]{14}$"
                        value={formData.phone}
                        onBlur={handleInputChange}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <br></br>
                <div>
                    <label for="password" className="justify-content-center">Password:</label>
                    
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
                <br></br>
                <div>
                    <label for="password_confirmation" className="justify-content-center">Confirm your Password:</label>
                    
                    <span className="text-danger">{errors.cpassError}</span>

                    <input
                        className="form-control"
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"

                        value={formData.password_confirmation}
                        onBlur={handleInputChange}
                        onChange={handleInputChange}
                        required
                    />
                </div>




                <button className="btn primary my-3 mx-auto reg-btn" type="button" onClick={(e) => handleSubmit(e)} disabled={errors.emailError || errors.nameError || errors.passError || errors.cpassError
                    || formData.name === '' || formData.password_confirmation === '' || formData.password === '' || formData.email === ''}>Submit</button>

            </form>
            {/* <div className={"alert alert-info mt-3 "+(registered?"visible":"invisible")} role="alert">
                                Please verify your E-mail, after verification you can continue to <Link to="/customer/checkout">checkOut page</Link> 
            </div> */}
        </div>
        </div>
        </div>
        
    );


}