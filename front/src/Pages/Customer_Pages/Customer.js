import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Navbar } from "../../Componenets/Customer/Navbar";
import Cart from "./Cart";
import DiningTables from "../Admin_Pages/DiningTables";
import { Register } from "./Register";
import { Verification } from "./Verification";
import { ResetPassword } from "./ResetPassword";
import FetchData from "./FetchData";
import { CustomerLogin } from "./CustomerLogin";
import { Fail } from "./PaymentFailiur";
import { Success } from "./PaymentSuccess";
import { Email } from "./Email";

export function Customer(){
    return(
        <>
      <Navbar />
      <div className='container '>
        <Switch>
          <Route exact path="/customer/menu" component={FetchData} />
          <Route path="/customer/checkout" component={Cart} />
          <Route path="/customer/register" component={Register} />
          <Route path="/customer/verify" component={Verification} />
          <Route path="/customer/login" component={CustomerLogin} />
          <Route path="/customer/resetpassword" component={ResetPassword} />
          <Route path="/customer/emailtoresetpassord" component={Email}/>
          <Route path="/customer/paymentfailed" component={Fail}/>
          <Route path="/customer/paymentsucceded" component={Success}/>
        </Switch>
      </div>
        </>
    )
}