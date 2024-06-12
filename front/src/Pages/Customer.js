import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Navbar } from "../Componenets/Navbar";
import FetchData from "./FetchData";
import Cart from "./Cart";
import DiningTables from "./DiningTables";
import { Register } from "./Register";
import { Verification } from "./Verification";
import { ResetPassword } from "./ResetPassword";

export function Customer(){
    return(
        <>
        <BrowserRouter>
      <Navbar/>
      {/* <FetchData />
      <Cart/> */}
      <div className='container'>
      <Switch>
        <Route exact path="/menu" component={FetchData} />
        <Route path="/checkout" component={Cart} />
        {/* <Route path="/admin/dining-tables/list" component={DiningTables}/> */}
        <Route path="/register" component={Register}/>
        <Route path="/verify" component={Verification}/>
        <Route path="/resetpassword" component={ResetPassword}/>


      </Switch>
      </div>

      </BrowserRouter>
        </>
    )
}