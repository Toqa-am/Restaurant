
import { Navbar } from "../../Components/Customer/Navbar";
import { Login } from "../Login";


export function CustomerLogin(){
    return(
        <div className="main-container">
        <Navbar />
        <div className='bg-light '>
        <Login loginEP='http://127.0.0.1:8000/api/auth/login' tokenName="CustomerToken" redirect="/customer/checkout" fpEndpoint="http://127.0.0.1:8000/api/auth/forgot-password" customer="true" />
        </div>
        </div>
    )
}