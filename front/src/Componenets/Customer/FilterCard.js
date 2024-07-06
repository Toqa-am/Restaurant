import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

export function FilterCard(props){
    return(
        <>
        <div >
        <button className="btn filter-button" onClick={props.filterr} >
            <img src={props.img} height={50} width={75} className="rounded" ></img>
            <div className="card-content"><strong> <h6 className="text-wrap">{props.title}</h6></strong></div>
            
        </button>
        </div>
        </>
    )
}