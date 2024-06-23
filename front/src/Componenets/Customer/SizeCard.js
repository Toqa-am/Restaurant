

export function SizeCard(props){
  let size=''
  if(props.size===1)
    size="Small"
  else if(props.size===2)
    size="Medium"
  else if(props.size===3)
    size="Big"
  else if(props.size===4)
    size="Family"
  else
    size=''


    return(
        <>
        <div  className="cart-card d-flex "  >
        
        <div className="form-check">
        <input className="form-check-input" type="radio" name="size" id={`radio-${size}`} onch/>
        <label className="form-check-label" for={`radio-${size}`} >
          {size}
        </label>
        <p>Cost: <strong>{props.price}</strong> </p>
        <p>Number of pieces:{props.nop}</p>
      </div>
        
        
      </div>
        </>
    )
}