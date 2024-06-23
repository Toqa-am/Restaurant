

export function AddonsExtra(props){
   
      return(
          <>
          <div  className="cart-card d-flex "  >
            <img src={`http://127.0.0.1:8000/storage/${props.img}`}></img>
          
          <div className="form-check">
          <input className="form-check-input" type="radio" name={props.name} id={`radio-${props.name}`} onch/>
          <label className="form-check-label" for={`radio-${props.name}`} >
            {props.name}
          </label>
          <p><strong>{props.price}</strong> </p>

          
        </div>
          
          
        </div>
          </>
      )
  }