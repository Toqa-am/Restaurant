import "./App.css";
import { Route } from "react-router-dom";
import {
  BrowserRouter,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import { Auth } from "./Pages/Dashboard_Pages/Auth/Auth";
import { Dashboard } from "./Pages/Dashboard_Pages/Dashboard";
import { Admin } from "./Pages/Admin_Pages/Admin";
import { Customer } from "./Pages/Customer_Pages/Customer";
import Loader from "./Components/Dashboard/Loader/Loader";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Loader />
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/admin/dashboard" component={Dashboard} />
          <Route path="/admin" component={Admin} />
          <Route path="/customer" component={Customer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
