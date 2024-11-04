
import { Navbar } from "../../Components/Customer/Navbar"
import fail from "../../Images/fail.png"
export function Fail() {
    return (
        <>
<div className="main-container">
        <Navbar/>
        <div className='bg-light '>
            <div className=" container w-75 m-auto text-center pt-5">
                <img src={fail} width={200} height={200} className="verImg"></img>
                <br></br>
                <p className=' my-4'>
                    <strong>Something went wrong, Please try again </strong>
                </p>
            </div>
            </div>
            </div>
        </>)
}