import { SizeCard } from '../Customer/SizeCard';
import { AddonsExtra } from '../Customer/AddonsExtra';
import { CartCard } from '../Customer/CartCard';
import { addToCart, decreaseItemBCart, increaseItemBCart, increaseItemQuant, zeroQuant } from '../../Store/action';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';



export function OfferListCard(pokemon) {
    const dispatch = useDispatch();
    const itemQuant = useSelector(state => state.itemQuant);
    const [CartFormData, setCartFormData] = useState({

        items: {},
        addons: []

    });
    const [cartItemWSize, setCartItemWSize] = useState({})
    const [chosen, setChosen] = useState(false)
    const [addon, setAddon] = useState(true)



    const handleCancel = () => {
        dispatch(zeroQuant())

    }

    function increaseItems(item) {

        dispatch(increaseItemBCart(item))
        console.log(item);


    }
    function decreaseItems(item) {


        dispatch(decreaseItemBCart(item.id))



    }

    function changeSize(size, item, e) {
        console.log(size);
        console.log(item);
        // let i = item
        console.log(e.target.checked);

        if (e.target.checked === true) {
            if (size.size === 1) {
                item.size = "Small"

            }
            else if (size.size === 2) {
                item.size = "Medium"

            }
            else if (size.size === 3) {
                item.size = "Big"

            }
            else if (size.size === 4) {
                item.size = "Family"


            }
            item.cost = size.cost
            item.nop = size.number_of_pieces
            console.log(item);
            console.log("kjhgf")
            setCartItemWSize(item);
            console.log(cartItemWSize)
            

            setCartFormData({ ...CartFormData, items: item })
            console.log(CartFormData.items)
        }


    }

    function increaseAddon(item) {
        if (typeof item.quant === "undefined") {
            item.quant = 1
            setAddon(!addon)
        }
        else {
            item.quant++
            console.log(item)
            setAddon(!addon)
        }


    }

    function decreaseAddon(item) {
        if (typeof item.quant === "undefined") {
            item.quant = 1
            setAddon(!addon)
        }
        else {
            console.log(item.quant)
            if (item.quant > 1) {
                item.quant--

            }
            console.log(item)
            setAddon(!addon)
        }


    }

    const handleCheckboxChange = (item, e) => {
        console.log(e);
        console.log(item);
        setChosen(true)
        if(!item.quant){
            item.quant=1;
        }
       
        if (e.target.checked) {
            setCartFormData({ ...CartFormData, addons: [...CartFormData.addons, item] })

        }
        else {
            setCartFormData({
                ...CartFormData, addons: [...CartFormData.addons.filter(function (addon) {
                    return addon.name !== item.name
                })]
            })

        }
        

        console.log(CartFormData);
    };

    const handleAddToCart = (pokemon, itemQuant) => {
        console.log(pokemon)
        if (JSON.stringify(CartFormData.items) === '{}') {
            dispatch(addToCart([pokemon, itemQuant]));


        }
        else {
            dispatch(addToCart([CartFormData.items, itemQuant]));
            console.log(CartFormData.items)
            CartFormData.addons.map((item) => (
                dispatch(addToCart([item, item.quant]))
            ))
        }

        setCartFormData({
            items: {},
            addons: []
        })

        dispatch(zeroQuant())
        console.log(CartFormData);

    };


    return (
        <>
            <div key={pokemon.id} className="pokemon-card card">
                <img
                    key={pokemon.image}
                    src={`http://127.0.0.1:8000/storage/${pokemon.pokemon.image}`}
                    className='pokemon-card-img'
                />

                {/* <img src={pokemon.image_url} alt={pokemon.pokemon} /> */}
                <div className="pokemon-details text-black-50 para d-grid h-100">
                    <div className='d-flex justify-content-between'>
                    <h6>{` ${pokemon.pokemon.name}`} </h6>
                    <span class="badge bg-danger p-1 my-auto">{pokemon.pokemon.discount} %</span>
                    </div>
                   

                    {pokemon.pokemon.items ? 
                     <span class="truncate text-muted text-black-50 para">
                            {pokemon.pokemon.items.substring(0,50)}..
</span>
                        :
                            ''
                        }
                    <div className="d-flex justify-content-between align-items-center item-card">
                            <p className="price text-muted text-decoration-line-through"> OMR {pokemon.pokemon.total_price_before_discount}</p>

                            <p className="price "> OMR {pokemon.pokemon.total_price_after_discount}</p>
                        

                        

                            <button
                            className="button rounded-pill"
                            data-bs-toggle="modal"
                            data-bs-target={`#staticBackdrop-${pokemon.pokemon.id}`}
                            onClick={() => {
                                console.log(pokemon.pokemon.item);
                            }}
                        >   <i class="bi bi-handbag-fill"></i>
                            <span >Add</span>
                        </button>

                        {/* <!-- Modal --> */}
                        <div
                            className="modal fade"
                            id={`staticBackdrop-${pokemon.pokemon.id}`}
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabIndex="-1"
                            aria-labelledby={`staticBackdropLabel-${pokemon.pokemon.id}`}
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCancel()}></button>
                                    </div>
                                    <div className="modal-body">
                                        <CartCard description={pokemon.pokemon.items} src={pokemon.pokemon.image} title={pokemon.pokemon.name} price={pokemon.pokemon.total_price_after_discount}  quant={itemQuant} increase={() => increaseItems(pokemon.pokemon)} decrease={() => decreaseItems(pokemon.pokemon)} />
                                       

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleCancel()}>
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            // disabled={((pokemon.item.table_name === "meals" && !pokemon.item.size) ? true : false)}
                                            className="btn primary"
                                            onClick={() => handleAddToCart(pokemon.pokemon, itemQuant)}
                                            data-bs-dismiss="modal"
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Modal */}
                    </div>
                </div>
            </div>
        </>
    )
}