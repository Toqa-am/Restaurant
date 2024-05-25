import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Store/action';
import './Fetchdata.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FilterCard } from '../Componenets/FilterCard';

const FetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); 
  const searchQ = useSelector(state => state.searchStatement);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyapi.online/api/pokemon');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
 
      const handleAddToCart = (pokemon) => {
        dispatch(addToCart(pokemon));
  };
  const filteredData = data.filter(pokemon => {
    if(searchQ===''){

    if (filter === 'veg') 
      return pokemon.type === 'Ground' || pokemon.type === 'Normal' || pokemon.type === 'Poison' || pokemon.type === 'Fighting';
    else if(filter === 'checken')
      return  pokemon.location.includes("Safari")
    else if (filter ==='Beef')
      return pokemon.location.includes("Saffron") 
    else if (filter ==='SeaFood')
      return pokemon.location.includes("Route 21")
    else if (filter ==='chinees')
      return pokemon.location.includes("Silph") 
    else if (filter ==='soup')
      return pokemon.location.includes("Mansion")
    else if(filter === 'grilled')
      return  pokemon.location.includes("Tower") }
    else{
      console.log(searchQ);
      return pokemon.pokemon.toLowerCase().includes(searchQ.toLowerCase())
    }
    return true; 
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

    return (
       
  <div>
    <div className="button-container d-flex justify-content-between align-items-center">
    <FilterCard title="ALL" filterr={(()=>handleFilterChange('all'))}/>
    <FilterCard title="checken" filterr={(()=>handleFilterChange('checken'))}/>
    <FilterCard title="Beef" filterr={(()=>handleFilterChange('Beef'))}/>
    <FilterCard title="Sea Food" filterr={(()=>handleFilterChange('SeaFood'))}/>
    <FilterCard title="Grilled" filterr={(()=>handleFilterChange('grilled'))}/>
    <FilterCard title="Soups" filterr={(()=>handleFilterChange('soup'))}/>
    <FilterCard title="Chinees" filterr={(()=>handleFilterChange('chinees'))}/>
    </div >


    <div className="button-container d-flex justify-content-between align-items-center">
      <div>
        <button
          className={`custom-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrk0mSA8x2ISlFZ0mOjQS8XclNQ5U3ixbGv0F7dpC0A&s"
            style={{ marginRight: '5px', width: '20px', height: '20px', borderRadius: '50%' }}
            alt="All"
            className="button-icon"
          />
          Non-Veg
        </button>
        <button
          className={`custom-button ${filter === 'veg' ? 'active' : ''}`}
          onClick={() => handleFilterChange('veg')}
        >
          <img
            src="https://i.pinimg.com/originals/f1/12/69/f11269b45e561d9612e8962bf635d2d5.png"
            alt="Veg"
            className="button-icon"
          />
          Veg
        </button>
      </div>
    </div>
      
    <div className="">
      
      {filteredData.map(pokemon => (
        <div key={pokemon.id} className="pokemon-card">
          <img src={pokemon.image_url} alt={pokemon.pokemon} />
          <div className="pokemon-details">
            <h5>{pokemon.pokemon}</h5>
            <p className="text-black-50 para">With a side of fried rice or supreme soy noodles, and steamed chi..</p>
            <div className="d-flex justify-content-between align-items-center">
              <p className="price">$ {pokemon.hitpoints}</p>
              <button className="button"  onClick={() => handleAddToCart(pokemon)}>
                <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '5px' }} />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


};

export default FetchData;
