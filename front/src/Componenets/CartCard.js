
export function CartCard(props){
    return(
        <>
        <div className="card mb-3 col-12"  >
        <div className="row ">
            <div className="col-md-4">
            <img src={props.src}  className=" rounded-start" height={75} width={75} alt="..."/>
            </div>
            <div className="col-md-8">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.price}</p>
                <span>
                    <button className="btn" onClick={(props.increase)}>
                    <i class="fa-solid fa-plus fa-xs"></i>
                    </button>
                    {props.quant}
                    <button className="btn" onClick={(props.decrease)}>
                    <i class="fa-solid fa-minus fa-xs"></i>    
                    </button>
                </span>

            </div>
            </div>
        </div>
        </div>
        </>
    )
}