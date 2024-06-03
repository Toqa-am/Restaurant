
export function FilterCard(props){
    return(
        <>
        
        <button className="btn filter-button" onClick={props.filterr}>
            {/* <img src={props.img}></img> */}
            <strong> <p>{props.title}</p></strong>
        </button>
        </>
    )
}