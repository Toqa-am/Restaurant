
import { Link } from 'react-router-dom';
import logo from '../logo.png'
import { useSelector } from "react-redux";
import cart from '../cart.gif'
import { EmptyCart } from './EmptyCart';
import FullCart from './FullCart';



export function Navbbar(){
    const cartTotal=useSelector((state)=>state.cartTotal)
    const cartItems=useSelector((state)=>state.cartItems)

    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
            <img src={logo} height={20}></img>
        </a>
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span classN ame="navbar-toggler-icon"></span>
        </button> */}
        {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link" href="#">Features</a>
            <a className="nav-item nav-link" href="#">Pricing</a>
            <a className="nav-item nav-link disabled" href="#">Disabled</a>
            </div>
            
        </div> */}
        
        <button className="btn btn-dark rounded-pill" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="fa-solid fa-bag-shopping"></i>{cartTotal}</button>

       

        </nav>

        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h3 id="offcanvasRightLabel" className='mx-auto fw-bolder'>My Cart</h3>
                    <button type="button" className="btn btn-danger rounded-circle fw-bolder" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
                </div>
                <div className="offcanvas-body">
                    {cartItems.length===0?<EmptyCart/>:<FullCart/>}
               
                </div>
                </div>
        </>
    )
}
