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
import { Verification } from './Pages/Verification';
import { ResetPassword } from './Pages/ResetPassword';
import { Customer } from './Pages/Customer';


function App() {
  return (
    // <AuthProvider>
    <div className="container">
      <Customer/>

    </div>
    
    // </AuthProvider>
  );
}

export default App;
