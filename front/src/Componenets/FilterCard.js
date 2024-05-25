
export function FilterCard(props){
    return(
        <>
        
        <button className="cart-card btn custom-button" onClick={props.filterr}>
            {/* <img src={props.img}></img> */}
            <h4>{props.title}</h4>
        </button>
        </>
    )
}