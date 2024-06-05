

export function SizeCard(props){

    return(
        <>
        <div  className="cart-card d-flex "  >
        
        <div className="form-check">
        <input className="form-check-input" type="radio" name="size" id={`radio-${props.size}`} onch/>
        <label className="form-check-label" for={`radio-${props.size}`} >
          {props.size}
        </label>
      </div>
        
        
      </div>
        </>
    )
}