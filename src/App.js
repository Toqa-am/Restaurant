import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Auth } from "./Pages/Dashboard_Pages/Auth/Auth";
import { Dashboard } from "./Pages/Dashboard_Pages/Dashboard";
import { Branch_2 } from "./Pages/Dashboard_Pages/Branch_2.js";
import Settings from "./Pages/Dashboard_Pages/Pages/Settings/Settings";
import Loader from "./Components/Dashboard/Loader/Loader.js";
import Cart from "./Pages/Customer_Pages/Cart";
import { Register } from "./Pages/Customer_Pages/Register.js";
import { Verification } from "./Pages/Customer_Pages/Verification";
import { ResetPassword } from "./Pages/Customer_Pages/ResetPassword";
import FetchData from "./Pages/Customer_Pages/FetchData";
import { CustomerLogin } from "./Pages/Customer_Pages/CustomerLogin";
import { Fail } from "./Pages/Customer_Pages/PaymentFailiur";
import { Success } from "./Pages/Customer_Pages/PaymentSuccess";
import { Email } from "./Pages/Customer_Pages/Email";
import { Offers } from "./Pages/Customer_Pages/Offers";
import NotFound from "./Pages/Customer_Pages/NotFound";
import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const [logo,setLogo]=useState("");
  const [title,setTitle]=useState("");

  // const [iconUrl, setIconUrl] = useState("/default-icon.ico")
  // const [logo,setLogo]=useState("");
  useEffect(() => {
    const getLogo= async () => {
      try {
        const settings = await axios.get("http://127.0.0.1:8000/api/settings");
        console.log(settings.data.data)
        setLogo(settings.data.data.logo);
        setTitle(settings.data.data.name);
      } catch (error) {}
    };
    getLogo()
  }, []);

  useEffect(() => {
    // Update the browser tab title
    document.title = title;
  }, [title]); // Update title whenever tabTitle changes

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    favicon.rel = "icon";
    favicon.href = `http://127.0.0.1:8000/storage/${logo}`;
    document.head.appendChild(favicon);
  }, [logo]); 
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Loader />

          <Switch>
            {/* <Route exact path="/" component={Index} /> */}
            <Route path="/auth" component={Auth} />
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/branch_2" component={Branch_2} />
            <Route path="/settings" component={Settings} />


            <Route exact path="/" component={FetchData} />
            <Route exact path="/customer/offers" component={Offers} />

            <Route path="/customer/checkout" component={Cart} />

            <Route path="/customer/register" component={Register} />

            <Route path="/customer/verify" component={Verification} />

            <Route path="/customer/login" component={CustomerLogin} />

            <Route path="/customer/resetpassword" component={ResetPassword} />

            <Route path="/customer/emailtoresetpassword" component={Email} />

            <Route path="/customer/paymentfailed" component={Fail} />

            <Route path="/customer/paymentsucceded" component={Success} />

            <Route component={NotFound} />




          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
