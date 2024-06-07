import { Route } from 'react-router-dom';
import './App.css';
import { Navbbar} from './Componenets/Navbar';
import { BrowserRouter, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import store from './Store/srore';
import { Provider } from 'react-redux';
import './App.css';
import FetchData from './Pages/FetchData';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './Componenets/Cart';
import SideBar from './Componenets/SideBar';
import Dashboard from './Componenets/Dashboard';

function App() {
  return (
    <Provider store={store}>
    <div className="container-fluide">
      {/* <BrowserRouter>
      <Navbbar/>
      <FetchData />

      <Switch>
        

      </Switch>
      </BrowserRouter> */}
<Dashboard></Dashboard>
        {/* <SideBar></SideBar> */}
    </div>
    </Provider>
  );
}

export default App;
