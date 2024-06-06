import { Route } from 'react-router-dom';
import './App.css';
import { Navbar} from './Componenets/Navbar';
import { BrowserRouter, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import FetchData from './Pages/FetchData';
import Cart from './Pages/Cart';
import DiningTables from './Pages/DiningTables';
import { Register } from './Pages/Register';


function App() {
  return (
    // <Provider store={store}>
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
    // <div className='container'>
    //   <DiningTables/>
    // </div>
    
  );
}

export default App;
