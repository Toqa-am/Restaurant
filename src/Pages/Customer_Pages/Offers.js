import axios from "axios";
import { useEffect, useState } from "react";
import { OfferGridCard } from "../../Components/Customer/OfferGridCard";
import { OfferListCard } from "../../Components/Customer/OfferListCard"
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

export function Offers() {

  const [offers, setOffers] = useState([])
  const [view, setView] = useState("list")
  const [page, setPage] = useState(0);
  const [updated, setUpdated] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchQ = useSelector(state => state.searchStatement);
  const [paginatedData, setPaginatedData] = useState([]);


  const num = 12;



  const changeView = (sentView, e) => {
    document.getElementsByClassName("chgView")[0].style.color = 'black'
    document.getElementsByClassName("chgView")[1].style.color = 'black'
    if (sentView === "list") {
      setView("list")
      e.target.style.color = '#f5cfb8'
    }
    else if (sentView === "grid") {
      setView("grid")
      e.target.style.color = '#f5cfb8'
    }
  }

  useEffect(() => {
    setPaginatedData(
      filteredData.filter((item, index) => {
        return (index >= page * num) & (index < (page + 1) * num);
      })
    );



  }, [page, updated, searchQ]);

  useEffect(() => {
    const getOffers = async () => {
      setLoading(true)
      try {
        const offers = await axios.get('http://127.0.0.1:8000/api/offers/items');
        console.log(offers.data)

        setOffers(offers.data.data)
        setOffers(prevData => prevData.map(item => ({
          ...item,

          table_name: 'offers'
        })));
        setLoading(false)
      }
      catch (error) {
        console.log(error)
        setLoading(false)

        setError(error)
      }
    };
    getOffers();
    setUpdated(!updated)
    setPage(1)
  }, []);
  const filteredData = offers.filter(item => {
    if (searchQ === '') {
      return offers;
    }
    else {
      return item.name.toLowerCase().includes(searchQ.toLowerCase())


    }
  })


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className=' container d-flex justify-content-between viewContainer'>
        <div className='mb-3'>

          <h2 className='header'>
            <strong>
              Our best offers
            </strong>
          </h2>

        </div>
        <div className="d-flex justify-content-between">
          <button className='btn view-btn' onClick={(e) => changeView("grid", e)}>
            <i className="bi bi-grid-3x2-gap-fill  view-icon chgView"></i>

          </button>

          <button className='btn view-btn' onClick={(e) => changeView("list", e)}>
            <i className="bi bi-view-list view-icon chgView"></i>

          </button>
        </div>

      </div>
      <div className="container mt-4 d-flex justify-content-between">

        {view === "grid" ? (
          <div className="row-cols-3 row  row-cols-md-2 g-4 grid-items-list">

            {paginatedData.map((offer) => (

              <OfferGridCard

                pokemon={offer} />
            ))}
          </div>
        ) :
          (<div className="pokemon-list">
            {paginatedData.map((offer) => (
              <OfferListCard
                pokemon={offer}
              />
            ))}
          </div>)}
      </div>

      <div className='w-75 m-auto'>
        <ReactPaginate
          pageCount={Math.ceil(filteredData.length / num)}
          pageRange={1}
          marginPagesDisplayed={2}
          onPageChange={(event) => setPage(event.selected)}
          containerClassName={'containerr'}
          previousLinkClassName={'pagee'}
          breakClassName={'pagee'}
          nextLinkClassName={'pagee'}
          pageClassName={'pagee'}
          disabledClassNae={'disabledd'}
          activeClassName={'activee'}
          previousLabel={"<<"}
          initialPage={0}
          nextLabel={">>"}
        />
      </div>
    </>
  )
}