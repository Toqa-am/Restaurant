import './App.css';
import FetchData from './Pages/FetchData';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './Componenets/Cart';
function App() {
  return (
    <div className="App">
            <main>
        <FetchData />
        <Cart/>
      </main>
    </div>
  );
}

export default App;
