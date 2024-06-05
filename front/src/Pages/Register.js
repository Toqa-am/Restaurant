import React, { useState } from 'react';


export function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: ''
    });
    const [errors, setErrors] = useState({
        nameError: "",
        emailError: "",
        passError: "",
        cpassError: ""
    })

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        console.log(event.target.value)
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
        else if (event.target.name === "confPassword") {
            setFormData({
                ...formData,
                confPassword: event.target.value
            })
            setErrors({
                ...errors,
                cpassError: event.target.value.length === 0 ? "This Field is required" : event.target.value !== formData.password && "Password and re-type should match"
            })

        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form data:', formData);
    };

    return (
        <div className="container text-center w-50 border border-primary-subtle my-5">
            <h4 className='my-3'>Please, fill your information</h4>

            <form >
                <div>
                    <label for="name">Name:</label>
                    <br></br>
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

                <div>
                    <label for="email">Email:</label>
                    <br></br>
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
                <div>
                    <label for="password">Password:</label>
                    <br></br>
                    {console.log(errors.passError)}
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

                <div>
                    <label for="confPassword">Confirm your Password:</label>
                    <br></br>
                    <span className="text-danger">{errors.cpassError}</span>

                    <input
                        className="form-control"
                        type="password"
                        id="confPassword"
                        name="confPassword"

                        value={formData.confPassword}
                        onBlur={handleInputChange}
                        onChange={handleInputChange}
                        required
                    />
                </div>




                <button className="btn btn-primary my-3 mx-auto" type="button" onClick={(e) => handleSubmit(e)} disabled={errors.emailError || errors.nameError || errors.passError || errors.cpassError
                    || formData.name === '' || formData.confPassword === '' || formData.password === '' || formData.email === ''}>Submit</button>
            </form>
        </div>
    );


}