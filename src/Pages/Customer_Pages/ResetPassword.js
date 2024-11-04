

import { Navbar } from "../../Components/Customer/Navbar";
import { ResetPasswordGeneral } from "../ResetPasswordGeneral";

export function ResetPassword() {
    return (<>
     <div className="main-container">
        <Navbar />
        <div className='bg-light '>
        <ResetPasswordGeneral endpoint="http://127.0.0.1:8000/api/auth/reset-password" />
        </div>
        </div>
    </>)
}