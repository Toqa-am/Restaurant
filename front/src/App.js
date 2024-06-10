import { Route } from 'react-router-dom';
import './App.css';
import { Navbar} from './Componenets/Navbar';
import { BrowserRouter, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import FetchData from './Pages/FetchData';
import Cart from './Pages/Cart';
import DiningTables from './Pages/DiningTables';
import { Register } from './Pages/Register';
import { AuthProvider } from './contextes/AuthContext';


function App() {
  return (
    // <AuthProvider>
    <div className="container">
      <BrowserRouter>
      <Navbar/>
      {/* <FetchData />
      <Cart/> */}
      <div className='container'>
      <Switch>
        <Route exact path="/" component={FetchData} />
        <Route path="/checkout" component={Cart} />
        <Route path="/admin/dining-tables/list" component={DiningTables}/>
        <Route path="/register" component={Register}/>

      </Switch>
      </div>

      </BrowserRouter>

    </div>
    
    // </AuthProvider>
  );
}

export default App;
