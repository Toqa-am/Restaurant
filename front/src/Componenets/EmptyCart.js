import cart from '../cart.gif'


export function EmptyCart(props){
    return(
        <>
        <img src={cart} height={200}></img>
        <p className='text-muted'> Good food is always cooking! Go ahead, order some yummy items from the menu.</p>

        </>)
        }
