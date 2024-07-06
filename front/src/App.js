import { Route } from 'react-router-dom';
import './App.css';
import { Navbar} from './Componenets/Customer/Navbar';
import { BrowserRouter, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';

import { Customer } from './Pages/Customer_Pages/Customer';
import { Admin } from './Pages/Admin_Pages/Admin';
import { useState } from 'react';
import Test from './Pages/Admin_Pages/Test';


function App() {
 
  return (

    <div className="container">
      {/* <Test/> */}
      <BrowserRouter>
     
      <div className='container'>
      <Switch>

        <Route path="/customer" component={Customer}/>
        <Route path="/admin" component={Admin}/>
     


      </Switch>
      </div>

      </BrowserRouter>
    

    </div>
    
  );
}

export default App;
