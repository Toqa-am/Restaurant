import React from 'react';
import notFound from '../../Images/not-found.png'
import { Navbar } from '../../Components/Customer/Navbar';
function NotFound() {
  return (
    <div className="main-container">
    <Navbar/>
    <div className='bg-light '>
    <div className='text-center pt-5 h-100' style={{backgroundColor:'#f6f6f6'}}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <img src={notFound} className="verImg"></img>
    </div>
    </div>
    </div>

   
  );
}

export default NotFound;
