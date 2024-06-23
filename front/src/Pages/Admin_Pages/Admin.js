import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { AdminLogin } from "./AdminLogin";
import DiningTables from "./DiningTables";
import Add_ons from "./Add-ons";
import Extras from "./Extras";


export function Admin(){
    return(<>
      <BrowserRouter>
      
     
      <div className='container '>
      <Switch>
<Route path="/admin/login" component={AdminLogin}/>
        <Route path="/admin/dining-tables/list" component={DiningTables}/>
        <Route path="/admin/add-ons/list" component={Add_ons}/>
        <Route path="/admin/extras/list" component={Extras}/>
     


      </Switch>
      </div>

      </BrowserRouter>
    </>)
}